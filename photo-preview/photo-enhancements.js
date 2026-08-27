/*
 * Vista previa fotográfica de On Media Group.
 * Para colocar las fotos reales, solo se reemplazan las rutas vacías de PHOTO_SOURCES.
 */
const PHOTO_SOURCES = {
  prom: "",
  led360: "",
  boda: "",
  backstage: "",
};

const PHOTO_SLOTS = [
  {
    selector: ".project-prom .project-art",
    key: "prom",
    eyebrow: "PRODUCCIÓN DE EVENTOS",
    title: "Senior Prom",
    guide: "Escenario, luces y estudiantes disfrutando",
  },
  {
    selector: ".project-cylinder .project-art",
    key: "led360",
    eyebrow: "PANTALLAS LED",
    title: "Experiencia 360°",
    guide: "Pantalla encendida dentro del montaje real",
  },
  {
    selector: ".project-wedding .project-art",
    key: "boda",
    eyebrow: "PRODUCCIÓN AUDIOVISUAL",
    title: "Momentos que permanecen",
    guide: "Pareja, invitados y ambiente de la celebración",
  },
];

function createPhotoStage(slot) {
  const stage = document.createElement("div");
  stage.className = "photo-stage";
  stage.dataset.photo = slot.key;

  const source = PHOTO_SOURCES[slot.key];
  if (source) {
    stage.classList.add("has-photo");
    stage.style.setProperty("--photo", `url("${source}")`);
  }

  stage.innerHTML = `
    <div class="photo-stage__placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <path d="M4 5.5h16v13H4zM7 15l3.1-3.2 2.4 2.3 2.1-2 2.4 2.9M16.5 9h.01" />
      </svg>
      <strong>ESPACIO PARA FOTO REAL</strong>
      <small>${slot.guide}</small>
    </div>
    <div class="photo-stage__shade"></div>
    <div class="photo-stage__caption">
      <span>${slot.eyebrow}</span>
      <strong>${slot.title}</strong>
    </div>
  `;
  return stage;
}

function enhanceCurrentSite() {
  const projectGrid = document.querySelector(".project-grid");
  if (!projectGrid || document.body.classList.contains("photo-preview-active")) return false;

  document.body.classList.add("photo-preview-active");

  PHOTO_SLOTS.forEach((slot) => {
    const target = document.querySelector(slot.selector);
    if (target) target.appendChild(createPhotoStage(slot));
  });

  const aboutVisual = document.querySelector(".about-visual");
  if (aboutVisual) {
    aboutVisual.appendChild(
      createPhotoStage({
        key: "backstage",
        eyebrow: "DETRÁS DE LA EXPERIENCIA",
        title: "El equipo en acción",
        guide: "Montaje, operación técnica o coordinación en sitio",
      }),
    );
  }

  const note = document.querySelector(".project-note");
  if (note) {
    note.innerHTML = "<span>Fotografías reales</span> Estos espacios conservarán el texto y el estilo del sitio; únicamente cambiará la imagen de cada experiencia.";
  }

  return true;
}

if (!enhanceCurrentSite()) {
  const observer = new MutationObserver(() => {
    if (enhanceCurrentSite()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}
