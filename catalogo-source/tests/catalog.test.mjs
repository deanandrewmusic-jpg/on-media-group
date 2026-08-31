import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { categories, services, filterServices, readSelection, buildMessage, formatDate, whatsappHref } from "../src/catalog.ts";

test("the initial catalogue has 12 unique services in four balanced categories", () => {
  assert.equal(services.length, 12);
  assert.equal(new Set(services.map(s => s.id)).size, 12);
  assert.deepEqual(categories.slice(1).map(c => filterServices(c.id, "").length), [4, 3, 3, 2]);
  assert.equal(services.filter(s => s.needsReview).length, 5);
});

test("search is case- and accent-insensitive and supports multiple terms", () => {
  assert.ok(filterServices("todos", "ILUMINACIÓN").some(s => s.id === "iluminacion"));
  assert.ok(filterServices("todos", "  pantalla    LED  ").some(s => s.id === "pantallas-led"));
  assert.ok(filterServices("todos", "btl").some(s => s.id === "activaciones-btl"));
  assert.equal(filterServices("eventos", "degustaciones").length, 0);
  assert.equal(filterServices("todos", "xyzneverexists").length, 0);
  assert.equal(filterServices("todos", " ").length, 12);
});

test("all images, brand assets and typefaces resolve locally", () => {
  for (const service of services) {
    assert.ok(existsSync(resolve("public/images", service.photo)), service.photo);
    assert.ok(service.alt.length > 20);
    assert.equal(service.includes.length, 3);
  }
  for (const filename of ["images/on-media-logo.png", "images/favicon-onmedia.png", "fonts/geist-latin.woff2"]) assert.ok(existsSync(resolve("public", filename)));
});

test("selection recovery ignores invalid IDs and corrupt storage", () => {
  assert.deepEqual(readSelection(null), []);
  assert.deepEqual(readSelection("malformed json"), []);
  assert.deepEqual(readSelection('{}'), []);
  assert.deepEqual(readSelection('["sonido","sonido",42,null,"unknown","pantallas-led"]'), ["sonido", "pantallas-led"]);
});

test("quotation includes only selected services and the current number", () => {
  const selected = services.filter(s => ["sonido", "materiales-promocionales"].includes(s.id));
  const fields = { name: " Ana ", company: "Empresa & Co.", city: "Tegucigalpa", date: "2026-11-14", message: "Evento de 80 personas, sonido + impresos." };
  const message = buildMessage(selected, "integral", fields);
  assert.match(message, /Nombre: Ana/);
  assert.match(message, /14\/11\/2026/);
  assert.match(message, /Una solución integral/);
  assert.match(message, /Materiales promocionales \(consultar disponibilidad\)/);
  assert.doesNotMatch(message, /Pantallas LED/);
  const link = new URL(whatsappHref(message));
  assert.equal(link.origin, "https://wa.me");
  assert.equal(link.pathname, "/50433558904");
  assert.equal(link.searchParams.get("text"), message);
  assert.equal([...link.searchParams.keys()].length, 1);
});

test("optional fields work, dates avoid timezone shifts, and input is bounded", () => {
  const message = buildMessage([services[0]], "puntual", { name: "A".repeat(200), company: "", city: "SPS", date: "", message: "Z".repeat(1200) });
  assert.match(message, /Fecha aproximada: Por definir/);
  assert.match(message, /Servicios puntuales/);
  assert.doesNotMatch(message, /Empresa:/);
  assert.ok(!message.includes("A".repeat(81)));
  assert.ok(!message.includes("Z".repeat(701)));
  assert.equal(formatDate("2026-11-01"), "01/11/2026");
});

test("privacy and preview guardrails remain explicit", () => {
  const app = readFileSync(resolve("src/main.tsx"), "utf8");
  const html = readFileSync(resolve("index.html"), "utf8");
  assert.match(html, /noindex, nofollow/);
  assert.match(app, /Vista previa/);
  assert.match(app, /No se ha enviado ningún mensaje/);
  assert.match(app, /WhatsApp todavía tenés que pulsar Enviar/);
  assert.match(app, /sessionStorage\.setItem\(SELECTION_KEY, JSON.stringify\(selectedIds\)\)/);
  assert.doesNotMatch(app, /localStorage|fetch\(|XMLHttpRequest|dangerouslySetInnerHTML/);
});
