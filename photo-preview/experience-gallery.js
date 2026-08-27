const EXPERIENCE_PHOTOS = {
  conciertos: "",
  proms: "",
  corporativos: "",
  btl: "",
  sociales: "",
  especiales: "",
};

const EXPERIENCE_FILTERS = [
  ["all", "Todas"],
  ["conciertos", "Conciertos"],
  ["proms", "Proms"],
  ["corporativos", "Corporativos"],
  ["btl", "BTL"],
  ["sociales", "Sociales"],
  ["especiales", "Montajes especiales"],
];

const EXPERIENCE_ITEMS = [
  {
    id: "conciertos",
    category: "conciertos",
    eyebrow: "CONCIERTOS Y ESPECTÁCULOS",
    title: "Producción preparada para grandes audiencias.",
    description: "Escenario, pantallas, iluminación y operación técnica trabajando como una sola experiencia.",
    scale: "Gran formato",
    services: ["Producción integral", "Sonido", "Iluminación", "Pantallas LED"],
    featured: true,
  },
  {
    id: "proms",
    category: "proms",
    eyebrow: "SENIOR PROMS",
    title: "Una noche diseñada para sentirse irrepetible.",
    description: "Ambiente, música, luces y contenido visual organizados para convertir la celebración en un recuerdo completo.",
    scale: "Escala media",
    services: ["Producción", "Iluminación", "Sonido", "Audiovisual"],
  },
  {
    id: "corporativos",
    category: "corporativos",
    eyebrow: "EVENTOS CORPORATIVOS",
    title: "Claridad técnica con presencia de marca.",
    description: "Conferencias, lanzamientos y encuentros donde cada mensaje debe verse y escucharse con precisión.",
    scale: "Escala adaptable",
    services: ["Pantallas LED", "Sonido", "Audiovisual"],
  },
  {
    id: "btl",
    category: "btl",
    eyebrow: "BTL Y ACTIVACIONES",
    title: "Experiencias que invitan a participar.",
    description: "Montajes que acercan la marca al público mediante tecnología, contenido y momentos memorables.",
    scale: "Formato modular",
    services: ["Concepto", "Montaje", "Tecnología", "Contenido"],
  },
  {
    id: "sociales",
    category: "sociales",
    eyebrow: "BODAS Y CELEBRACIONES",
    title: "Cada detalle acompaña el momento.",
    description: "Producción y cobertura para conservar la energía, las emociones y los detalles de una celebración.",
    scale: "Íntimo o amplio",
    services: ["Iluminación", "Sonido", "Foto y video"],
  },
  {
    id: "especiales",
    category: "especiales",
    eyebrow: "FORMATOS ESPECIALES",
    title: "Tecnología que también forma parte del diseño.",
    description: "Pantallas cilíndricas, montajes personalizados y soluciones que convierten una idea visual en una experiencia física.",
    scale: "Formato especial",
    services: ["Pantallas 360°", "Contenido", "Integración técnica"],
  },
];

function photoPlaceholder(item, className) {
  const source = EXPERIENCE_PHOTOS[item.id];
  const style = source ? ' style="--experience-photo:url(' + source + ')"' : "";
  const hasPhoto = source ? " has-photo" : "";
  return (
    '<div class="' + className + hasPhoto + '"' + style +
      ' role="img" aria-label="' + (source ? item.eyebrow : "Fotografía real pendiente: " + item.eyebrow) + '">' +
      '<div class="experience-photo__placeholder" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24"><path d="M4 5.5h16v13H4zM7 15l3.1-3.2 2.4 2.3 2.1-2 2.4 2.9M16.5 9h.01"/></svg>' +
        '<strong>FOTO REAL</strong>' +
      "</div>" +
    "</div>"
  );
}

function serviceTags(item) {
  return item.services.map(function (service) {
    return "<span>" + service + "</span>";
  }).join("");
}

function experienceCard(item) {
  return (
    '<article class="experience-card' + (item.featured ? " experience-card--featured" : "") +
      '" data-category="' + item.category + '">' +
      photoPlaceholder(item, "experience-photo") +
      '<div class="experience-content">' +
        '<div class="experience-meta">' +
          "<span>" + item.eyebrow + "</span>" +
          "<em>" + item.scale + "</em>" +
        "</div>" +
        "<h3>" + item.title + "</h3>" +
        "<p>" + item.description + "</p>" +
        '<div class="experience-services" aria-label="Servicios">' + serviceTags(item) + "</div>" +
        '<button class="experience-view" type="button" data-experience="' + item.id + '">' +
          'Ver experiencia <span aria-hidden="true">↗</span>' +
        "</button>" +
      "</div>" +
    "</article>"
  );
}

function createExperienceDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "experience-dialog";
  dialog.innerHTML =
    '<div class="experience-dialog__surface">' +
      '<button class="experience-dialog__close" type="button" aria-label="Cerrar">×</button>' +
      '<div class="experience-dialog__media"></div>' +
      '<div class="experience-dialog__copy">' +
        '<div class="experience-meta"><span class="dialog-eyebrow"></span><em class="dialog-scale"></em></div>' +
        "<h3></h3><p></p>" +
        '<div class="experience-services"></div>' +
      "</div>" +
    "</div>";
  document.body.appendChild(dialog);
  dialog.querySelector(".experience-dialog__close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  return dialog;
}

function openExperience(dialog, item) {
  dialog.querySelector(".experience-dialog__media").innerHTML = photoPlaceholder(item, "experience-photo experience-photo--dialog");
  dialog.querySelector(".dialog-eyebrow").textContent = item.eyebrow;
  dialog.querySelector(".dialog-scale").textContent = item.scale;
  dialog.querySelector("h3").textContent = item.title;
  dialog.querySelector("p").textContent = item.description;
  dialog.querySelector(".experience-services").innerHTML = serviceTags(item);
  dialog.showModal();
}

function initializeExperienceGallery() {
  const projectGrid = document.querySelector(".project-grid");
  if (!projectGrid || document.body.classList.contains("experience-v3-active")) return false;

  document.body.classList.add("experience-v3-active");
  document.querySelectorAll('a[href="#proyectos"]').forEach(function (link) {
    link.textContent = "Experiencias";
  });

  const projects = document.querySelector("#proyectos");
  const number = projects && projects.querySelector(".section-number");
  const heading = projects && projects.querySelector(".section-heading h2");
  const intro = projects && projects.querySelector(".section-heading > p");
  if (number) number.textContent = "02 / EXPERIENCIAS";
  if (heading) heading.innerHTML = "Experiencias reales,<br><em>de distintas escalas.</em>";
  if (intro) intro.textContent = "Desde una celebración íntima hasta un concierto de gran formato: la calidad debe sentirse en cada escala.";

  projectGrid.className = "project-grid experience-showcase";
  projectGrid.innerHTML =
    '<div class="experience-toolbar">' +
      "<p>Explorá los proyectos por tipo de evento.</p>" +
      '<div class="experience-filters" role="group" aria-label="Filtrar experiencias">' +
        EXPERIENCE_FILTERS.map(function (filter, index) {
          return '<button type="button" data-filter="' + filter[0] +
            '" aria-pressed="' + String(index === 0) + '">' + filter[1] + "</button>";
        }).join("") +
      "</div>" +
      '<div class="experience-carousel-nav" aria-label="Recorrer experiencias">' +
        '<span class="experience-counter" aria-live="polite">01 / 06</span>' +
        '<button type="button" data-carousel="previous" aria-label="Experiencia anterior">←</button>' +
        '<button type="button" data-carousel="next" aria-label="Experiencia siguiente">→</button>' +
      "</div>" +
    "</div>" +
    '<div class="experience-grid">' + EXPERIENCE_ITEMS.map(experienceCard).join("") + "</div>";

  const filterButtons = projectGrid.querySelectorAll("[data-filter]");
  const cards = projectGrid.querySelectorAll(".experience-card");
  const carousel = projectGrid.querySelector(".experience-grid");
  const previousButton = projectGrid.querySelector('[data-carousel="previous"]');
  const nextButton = projectGrid.querySelector('[data-carousel="next"]');
  const counter = projectGrid.querySelector(".experience-counter");
  let activeExperience = 0;

  function visibleCards() {
    return Array.from(cards).filter(function (card) {
      return !card.hidden;
    });
  }

  function updateCarouselControls() {
    const available = visibleCards();
    activeExperience = Math.max(0, Math.min(activeExperience, available.length - 1));
    counter.textContent = String(activeExperience + 1).padStart(2, "0") + " / " +
      String(available.length).padStart(2, "0");
    previousButton.disabled = activeExperience === 0;
    nextButton.disabled = activeExperience >= available.length - 1;
  }

  function goToExperience(index, smooth) {
    const available = visibleCards();
    if (!available.length) return;
    activeExperience = Math.max(0, Math.min(index, available.length - 1));
    const card = available[activeExperience];
    const cardLeft = card.getBoundingClientRect().left -
      carousel.getBoundingClientRect().left + carousel.scrollLeft;
    carousel.scrollTo({ left: cardLeft, behavior: smooth ? "smooth" : "auto" });
    updateCarouselControls();
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selected = button.dataset.filter;
      filterButtons.forEach(function (filterButton) {
        filterButton.setAttribute("aria-pressed", String(filterButton === button));
      });
      cards.forEach(function (card) {
        card.hidden = selected !== "all" && card.dataset.category !== selected;
      });
      goToExperience(0, false);
    });
  });

  previousButton.addEventListener("click", function () {
    goToExperience(activeExperience - 1, true);
  });

  nextButton.addEventListener("click", function () {
    goToExperience(activeExperience + 1, true);
  });

  let scrollFrame;
  carousel.addEventListener("scroll", function () {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(function () {
      const available = visibleCards();
      if (!available.length) return;
      const carouselLeft = carousel.getBoundingClientRect().left;
      let closest = 0;
      let closestDistance = Infinity;
      available.forEach(function (card, index) {
        const distance = Math.abs(card.getBoundingClientRect().left - carouselLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });
      activeExperience = closest;
      updateCarouselControls();
    });
  }, { passive: true });

  goToExperience(0, false);

  const dialog = createExperienceDialog();
  projectGrid.querySelectorAll("[data-experience]").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = EXPERIENCE_ITEMS.find(function (entry) {
        return entry.id === button.dataset.experience;
      });
      openExperience(dialog, item);
    });
  });

  const note = document.querySelector(".project-note");
  if (note) {
    note.innerHTML = "<span>Fotografías reales</span> Cada imagen conservará su proporción y mostrará proyectos de distintas escalas sin deformarse.";
  }
  return true;
}

if (!initializeExperienceGallery()) {
  const galleryObserver = new MutationObserver(function () {
    if (initializeExperienceGallery()) galleryObserver.disconnect();
  });
  galleryObserver.observe(document.documentElement, { childList: true, subtree: true });
}
