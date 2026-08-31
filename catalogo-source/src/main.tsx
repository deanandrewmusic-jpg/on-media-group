import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, ClipboardCheck,
  Copy, ExternalLink, Film, Grid2X2, Info, Layers3, ListChecks, Mail,
  MessageCircle, Palette, PartyPopper, Plus, Search, Share2, Sparkles, Trash2, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  buildMessage, cases, categories, filterServices, readSelection, SELECTION_KEY,
  services, whatsappHref, WHATSAPP_DISPLAY, WHATSAPP_NUMBER,
  type CategoryId, type QuoteFields, type Scope, type Service,
} from "./catalog";
import "./styles.css";

const icons = { todos: Grid2X2, eventos: PartyPopper, marca: Sparkles, contenido: Film, branding: Palette };
const assets = (name: string) => `./images/${name}`;
const initialFields: QuoteFields = { name: "", company: "", city: "", date: "", message: "" };

function loadSelection() {
  try { return readSelection(sessionStorage.getItem(SELECTION_KEY)); } catch { return []; }
}

function App() {
  const [category, setCategory] = useState<CategoryId>("todos");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>(loadSelection);
  const [detail, setDetail] = useState<Service | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteStep, setQuoteStep] = useState<"form" | "review">("form");
  const [scope, setScope] = useState<Scope>("puntual");
  const [fields, setFields] = useState<QuoteFields>(initialFields);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const quoteMessageRef = useRef<HTMLTextAreaElement>(null);
  const shareInputRef = useRef<HTMLInputElement>(null);
  const visible = useMemo(() => filterServices(category, query), [category, query]);
  const selected = services.filter((service) => selectedIds.includes(service.id));
  const message = buildMessage(selected, scope, fields);
  const shareUrl = new URL("./", window.location.href).href;

  useEffect(() => {
    try { sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selectedIds)); } catch { /* Private mode still works in memory. */ }
  }, [selectedIds]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4200);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggleService(service: Service) {
    const exists = selectedIds.includes(service.id);
    setSelectedIds((ids) => exists ? ids.filter((id) => id !== service.id) : [...ids, service.id]);
    setNotice(exists ? `${service.title}: quitado de tu solicitud.` : `${service.title}: agregado a tu solicitud.`);
    setFormError("");
    setQuoteStep("form");
  }

  function rememberFocus() { lastFocus.current = document.activeElement as HTMLElement | null; }
  function restoreFocus(event: Event) {
    event.preventDefault();
    if (lastFocus.current?.isConnected) lastFocus.current.focus();
  }

  function openQuote() {
    rememberFocus(); setQuoteStep("form"); setFormError(""); setManualCopy(false); setQuoteOpen(true);
  }

  function pickCategory(id: CategoryId, scroll = false) {
    setCategory(id); setQuery("");
    if (scroll) window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  function updateField(name: keyof QuoteFields, value: string) {
    setFields((current) => ({ ...current, [name]: value })); setFormError("");
  }

  function prepareQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected.length) { setFormError("Agregá al menos un servicio para preparar la consulta."); return; }
    if (!fields.name.trim() || !fields.city.trim()) {
      setFormError("Completá tu nombre y el lugar del proyecto."); return;
    }
    setQuoteStep("review"); setManualCopy(false); setFormError("");
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setNotice("Consulta copiada. Podés pegarla en tu chat o correo.");
    } catch {
      setManualCopy(true);
      window.setTimeout(() => { quoteMessageRef.current?.focus(); quoteMessageRef.current?.select(); }, 0);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setNotice("Enlace del catálogo copiado.");
    } catch {
      setNotice("Seleccioná el enlace y copialo desde el campo.");
      shareInputRef.current?.focus(); shareInputRef.current?.select();
    }
  }

  return (
    <>
      <a className="skip-link" href="#servicios">Ir a los servicios</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="On Media Group, inicio del catálogo">
            <span className="brand-mark"><img src={assets("on-media-logo.png")} alt="" width="46" height="46" /></span>
            <span className="brand-name">ON MEDIA<small>G R O U P</small></span>
          </a>
          <span className="header-divider" aria-hidden="true" />
          <span className="catalog-label">Catálogo de servicios</span>
          <nav className="header-actions" aria-label="Navegación principal">
            <a className="website-link" href="https://onmediagroup.hn" target="_blank" rel="noopener noreferrer">Ver sitio <ArrowUpRight size={16} /></a>
            <Button variant="ghost" className="share-button" aria-label="Compartir catálogo" onClick={() => { rememberFocus(); setShareOpen(true); }}><Share2 size={17} /></Button>
            <Button className="quote-button" onClick={openQuote}><ListChecks size={17} /><span>Mi solicitud</span><span className="selection-count">{selected.length}</span></Button>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <div className="review-strip"><span className="preview-dot" /><strong>Vista previa</strong><span>Catálogo en revisión antes de compartir con clientes.</span></div>
        <section className="intro" aria-labelledby="catalog-heading">
          <div className="container intro-inner">
            <div><p className="eyebrow"><span />DEL PRIMER PIXEL AL ÚLTIMO APLAUSO</p><h1 id="catalog-heading">Lo que tu proyecto necesita.<br /><em>Todo en un solo lugar.</em></h1></div>
            <div className="intro-aside"><p>Un servicio puntual o una producción completa.<br />Vos elegís el alcance. Nosotros lo coordinamos.</p><ol className="mini-steps"><li><span>1</span>Explorá</li><ChevronRight size={13} aria-hidden="true" /><li><span>2</span>Elegí</li><ChevronRight size={13} aria-hidden="true" /><li><span>3</span>Consultá</li></ol></div>
          </div>
        </section>

        <section id="servicios" className="catalog-section" aria-labelledby="services-heading" ref={resultsRef}>
          <div className="container">
            <h2 id="services-heading" className="sr-only">Explorar servicios</h2>
            <div className="category-grid" role="group" aria-label="Filtrar por categoría">
              {categories.map((cat) => {
                const Icon = icons[cat.id];
                const count = cat.id === "todos" ? services.length : services.filter((service) => service.category === cat.id).length;
                return <Button key={cat.id} variant="ghost" className={`category-button ${category === cat.id ? "is-active" : ""}`} aria-pressed={category === cat.id} onClick={() => pickCategory(cat.id)}><Icon size={20} /><span><strong>{cat.label}</strong><small>{cat.hint}</small></span><span className="category-count">{count}</span></Button>;
              })}
            </div>

            <div className="catalog-toolbar">
              <div className="search-field"><Search size={18} aria-hidden="true" /><Label htmlFor="service-search" className="sr-only">Buscar servicios</Label><Input ref={searchRef} id="service-search" type="search" autoComplete="off" placeholder="Buscá: pantallas, concierto, video…" maxLength={100} value={query} onChange={(event) => setQuery(event.target.value)} />{query && <Button variant="ghost" className="clear-search" aria-label="Limpiar búsqueda" onClick={() => { setQuery(""); searchRef.current?.focus(); }}><X size={15} /></Button>}</div>
              <p className="results-label" aria-live="polite"><strong>{visible.length} {visible.length === 1 ? "servicio" : "servicios"}</strong><span>Elegí uno o combiná varios</span></p>
            </div>

            {visible.length ? <div className="service-grid">
              {visible.map((service, index) => {
                const added = selectedIds.includes(service.id);
                return <article className={`service-card ${added ? "is-selected" : ""}`} key={service.id}>
                  <button type="button" className="card-image-button" onClick={() => { rememberFocus(); setDetail(service); }} aria-label={`Ver detalles de ${service.title}`}>
                    <img src={assets(service.photo)} alt={service.alt} width="64" height="64" loading={index < 3 ? "eager" : "lazy"} decoding="async" style={{ objectPosition: service.position }} />
                    <span className="image-shade" /><span className="card-category">{categories.find((cat) => cat.id === service.category)?.short}</span><span className="image-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
                    {added && <span className="photo-selected"><Check size={13} />Seleccionado</span>}
                  </button>
                  <div className="card-body"><div className="card-title-row"><h3>{service.title}</h3></div><p className="card-description">{service.description}</p><p className="service-preview-note">{service.needsReview ? <><Info size={12} /><span>Disponibilidad por confirmar</span></> : <><Check size={12} /><span>Alcance adaptado a tu proyecto</span></>}</p><div className="card-actions"><Button variant="ghost" className="details-button" onClick={() => { rememberFocus(); setDetail(service); }}>Ver detalles <ArrowRight size={14} /></Button><Button variant="outline" className={`add-button ${added ? "added" : ""}`} aria-pressed={added} aria-label={added ? `Quitar ${service.title} de mi solicitud` : `Agregar ${service.title} a mi solicitud`} onClick={() => toggleService(service)}>{added ? <Check size={16} /> : <Plus size={16} />}{added ? "Agregado" : "Agregar"}</Button></div></div>
                </article>;
              })}
            </div> : <div className="empty-search"><Search size={34} /><h3>No encontramos ese servicio</h3><p>Probá con otra palabra o explorá todas las categorías.</p><Button onClick={() => { setQuery(""); setCategory("todos"); }}>Ver todos los servicios</Button><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">¿Buscás algo diferente? Consultanos <ArrowUpRight size={15} /></a></div>}

            <div className="catalog-note"><Info size={17} /><p>Las fichas resumen cada servicio. El alcance, la disponibilidad y el precio se confirman en una propuesta personalizada.</p></div>
          </div>
        </section>

        <section className="portfolio-section" aria-labelledby="portfolio-heading"><div className="container"><div className="section-heading"><div><p className="eyebrow">EL TRABAJO SE VE</p><h2 id="portfolio-heading">Diferentes proyectos.<br /><span>La misma atención al detalle.</span></h2></div><p>Conocé algunas experiencias del portafolio.<br />Encontrá ideas para tu próximo proyecto.</p></div><div className="case-grid">{cases.map((item) => <button className="case-card" type="button" key={item.title} onClick={() => pickCategory(item.category, true)}><img src={assets(item.photo)} alt={item.alt} width="900" height="560" loading="lazy" decoding="async" /><span className="case-gradient" /><span className="case-caption"><small>{item.label}</small><strong>{item.title}</strong><span>Explorar servicios relacionados <ArrowUpRight size={16} /></span></span></button>)}</div></div></section>

        <section className="help-section"><div className="container help-inner"><div className="help-icon"><MessageCircle size={30} /></div><div><h2>¿Todavía no sabés qué necesitás?</h2><p>Contanos tu idea. Te ayudamos a definir por dónde empezar.</p></div><Button asChild className="help-button"><a href={whatsappHref("Hola, On Media. Tengo un proyecto y me gustaría que me orientaran sobre los servicios que necesito.")} target="_blank" rel="noopener noreferrer">Conversemos <ArrowUpRight size={17} /></a></Button></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><span>ON MEDIA GROUP<span className="footer-dot">·</span>Producción. Tecnología. Experiencias.</span><a href="mailto:mercadeo@onmediagroup.hn"><Mail size={15} />mercadeo@onmediagroup.hn</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} />{WHATSAPP_DISPLAY}</a></div></footer>

      {selected.length > 0 && <aside className="selection-bar" aria-label="Resumen de tu selección"><div className="selection-icon"><ListChecks size={21} /><span>{selected.length}</span></div><div className="selection-bar-text"><strong>{selected.length} {selected.length === 1 ? "servicio en tu solicitud" : "servicios en tu solicitud"}</strong><small>Sin compromiso. Vos elegís el siguiente paso.</small></div><Button className="selection-continue" onClick={openQuote}>Revisar solicitud <ArrowRight size={17} /></Button></aside>}
      <div className={`toast ${notice ? "toast-visible" : ""} ${selected.length ? "toast-with-selection" : ""}`} role="status" aria-live="polite">{notice && <><Check size={17} />{notice}</>}</div>

      <Dialog open={Boolean(detail)} onOpenChange={(open) => { if (!open) setDetail(null); }}>
        <DialogContent className="catalog-dialog service-dialog" showCloseButton={false} onCloseAutoFocus={restoreFocus}>
          {detail && <><DialogClose asChild><Button className="modal-close" variant="ghost" aria-label="Cerrar detalles"><X size={21} /></Button></DialogClose><div className="detail-photo"><img src={assets(detail.photo)} alt={detail.alt} style={{ objectPosition: detail.position }} /><span>Servicio de On Media</span></div><div className="detail-content"><DialogHeader><p className="eyebrow">{categories.find((cat) => cat.id === detail.category)?.label}</p><DialogTitle>{detail.title}</DialogTitle><DialogDescription>{detail.detail}</DialogDescription></DialogHeader><h3>Lo que podemos coordinar</h3><ul className="includes-list">{detail.includes.map((item) => <li key={item}><span><Check size={15} /></span>{item}</li>)}</ul><div className="ideal-for"><strong>Ideal para</strong><p>{detail.idealFor}</p></div>{detail.needsReview && <p className="review-warning"><Info size={16} />Este servicio proviene del material comercial anterior y está pendiente de validación. Podés consultar su disponibilidad.</p>}<div className="detail-footer"><small>El equipo confirma alcance, disponibilidad y precio.</small><Button className="detail-add" onClick={() => toggleService(detail)}>{selectedIds.includes(detail.id) ? <Check size={17} /> : <Plus size={17} />}{selectedIds.includes(detail.id) ? "Agregado · Quitar de mi solicitud" : "Agregar a mi solicitud"}</Button></div></div></>}
        </DialogContent>
      </Dialog>

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="catalog-dialog quote-dialog" showCloseButton={false} onCloseAutoFocus={restoreFocus}>
          <DialogClose asChild><Button className="modal-close" variant="ghost" aria-label="Cerrar solicitud"><X size={21} /></Button></DialogClose>
          <DialogHeader className="quote-heading"><p className="eyebrow">ARMEMOS TU PRÓXIMO PROYECTO</p><DialogTitle>{quoteStep === "review" ? "Tu consulta, lista para revisar." : "Tu selección. Tu proyecto."}</DialogTitle><DialogDescription>{quoteStep === "review" ? "Revisá el resumen. WhatsApp se abrirá con este texto y vos decidís cuándo enviarlo." : "Combiná lo que necesitás y contanos algunos detalles para orientarte."}</DialogDescription></DialogHeader>
          {selected.length === 0 ? <div className="empty-quote"><Layers3 size={44} /><h3>Tu solicitud empieza con una idea.</h3><p>Agregá servicios del catálogo. Podés elegir uno o combinar varias soluciones.</p><DialogClose asChild><Button>Explorar servicios <ArrowRight size={16} /></Button></DialogClose><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">También podés pedirnos orientación.</a></div> : quoteStep === "form" ? <form onSubmit={prepareQuote} className="quote-form">
            <div className="quote-columns"><div className="selected-column"><div className="selected-heading"><h3>Servicios seleccionados <span>{selected.length}</span></h3><Button type="button" variant="ghost" className="clear-selection" onClick={() => { setSelectedIds([]); setNotice("Tu selección quedó vacía."); }}><Trash2 size={13} />Vaciar</Button></div><ul className="selected-list">{selected.map((service) => <li key={service.id}><img src={assets(service.photo)} alt="" width="52" height="52" /><span><strong>{service.title}</strong>{service.needsReview && <small>Consultar disponibilidad</small>}</span><Button type="button" variant="ghost" className="remove-service" aria-label={`Quitar ${service.title}`} onClick={() => toggleService(service)}><X size={16} /></Button></li>)}</ul><fieldset className="scope-fieldset"><legend>¿Cómo querés trabajarlo?</legend><label className={`scope-option ${scope === "puntual" ? "checked" : ""}`}><input type="radio" name="scope" value="puntual" checked={scope === "puntual"} onChange={() => setScope("puntual")} /><span><strong>Servicios puntuales</strong><small>Necesito resolver algo específico.</small></span></label><label className={`scope-option ${scope === "integral" ? "checked" : ""}`}><input type="radio" name="scope" value="integral" checked={scope === "integral"} onChange={() => setScope("integral")} /><span><strong>Una solución integral</strong><small>Quiero coordinar varias áreas.</small></span></label></fieldset></div><div className="fields-column"><div className="form-fields"><div className="form-field"><Label htmlFor="quote-name">Tu nombre <span>*</span></Label><Input id="quote-name" name="name" required autoComplete="name" maxLength={80} placeholder="¿Cómo te llamás?" value={fields.name} onChange={(e) => updateField("name", e.target.value)} /></div><div className="form-field"><Label htmlFor="quote-company">Empresa <small>opcional</small></Label><Input id="quote-company" name="organization" autoComplete="organization" maxLength={100} placeholder="Nombre de tu empresa" value={fields.company} onChange={(e) => updateField("company", e.target.value)} /></div><div className="form-field"><Label htmlFor="quote-city">Ciudad o lugar <span>*</span></Label><Input id="quote-city" name="city" autoComplete="address-level2" required maxLength={120} placeholder="Ej. Tegucigalpa" value={fields.city} onChange={(e) => updateField("city", e.target.value)} /></div><div className="form-field"><Label htmlFor="quote-date">Fecha aproximada <small>opcional</small></Label><Input id="quote-date" name="date" type="date" value={fields.date} onChange={(e) => updateField("date", e.target.value)} /><small>Si todavía no la tenés, dejala vacía.</small></div><div className="form-field full-width"><Label htmlFor="quote-message">Contanos un poco más <small>opcional</small></Label><Textarea id="quote-message" name="message" rows={4} maxLength={700} placeholder="¿Qué estás organizando? ¿Cuántas personas esperás? ¿Qué te gustaría lograr?" value={fields.message} onChange={(e) => updateField("message", e.target.value)} /><small>{fields.message.length}/700 caracteres</small></div></div><p className="privacy-note"><Info size={15} />Tus datos no se guardan en un servidor. Se compartirán con On Media únicamente cuando enviés el mensaje en WhatsApp.</p>{formError && <p className="form-error" role="alert">{formError}</p>}<Button type="submit" className="prepare-button">Revisar mi consulta <ArrowRight size={17} /></Button><p className="form-disclaimer">No es una reserva ni una compra. Te responderemos con una propuesta según disponibilidad.</p></div></div>
          </form> : <div className="message-review"><div className="recipient-box"><span className="recipient-icon"><MessageCircle size={23} /></span><span><small>DESTINATARIO</small><strong>On Media Group · {WHATSAPP_DISPLAY}</strong></span><span className="recipient-status">WhatsApp</span></div><Label htmlFor="quote-summary" className="sr-only">Resumen de la consulta</Label><Textarea ref={quoteMessageRef} id="quote-summary" className="message-text" value={message} readOnly rows={12} />{manualCopy && <p className="copy-instruction" role="status">Seleccioná el texto y usá Copiar para pegarlo en WhatsApp o correo.</p>}<div className="message-actions"><Button variant="outline" onClick={() => setQuoteStep("form")}><ArrowLeft size={16} />Editar</Button><Button variant="outline" onClick={copyMessage}><Copy size={16} />Copiar texto</Button><Button asChild className="whatsapp-button"><a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />Abrir WhatsApp <ArrowUpRight size={17} /></a></Button></div><p className="manual-send"><Info size={15} />No se ha enviado ningún mensaje. Al abrir WhatsApp todavía tenés que pulsar Enviar.</p></div>}
        </DialogContent>
      </Dialog>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="catalog-dialog share-dialog" showCloseButton={false} onCloseAutoFocus={restoreFocus}><DialogClose asChild><Button className="modal-close" variant="ghost" aria-label="Cerrar compartir"><X size={21} /></Button></DialogClose><div className="share-icon"><Share2 size={26} /></div><DialogHeader><DialogTitle>El catálogo, a un enlace.</DialogTitle><DialogDescription>Copiá este enlace para revisarlo con Melissa. Esta versión todavía está en revisión comercial.</DialogDescription></DialogHeader><Label htmlFor="catalog-link">Enlace de la previsualización</Label><Input ref={shareInputRef} id="catalog-link" readOnly value={shareUrl} onFocus={(event) => event.target.select()} /><Button className="copy-link-button" onClick={copyLink}><Copy size={17} />Copiar enlace</Button><p className="share-note">La selección y tus datos personales no se incluyen en el enlace.</p></DialogContent>
      </Dialog>
    </>
  );
}

class CatalogBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="fallback"><img src={assets("on-media-logo.png")} alt="On Media Group" width="80" /><h1>Estamos teniendo un problema al cargar el catálogo.</h1><p>Podés recargar la página o consultar directamente al equipo.</p><a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Escribir a {WHATSAPP_DISPLAY}</a><button onClick={() => window.location.reload()}>Volver a cargar</button></main>;
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><CatalogBoundary><App /></CatalogBoundary></React.StrictMode>);
