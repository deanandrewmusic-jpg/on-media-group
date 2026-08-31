export type CategoryId = "todos" | "eventos" | "marca" | "contenido" | "branding";
export type Scope = "puntual" | "integral";

export interface Service {
  id: string;
  category: Exclude<CategoryId, "todos">;
  title: string;
  description: string;
  photo: string;
  alt: string;
  position?: string;
  includes: string[];
  idealFor: string;
  detail: string;
  needsReview?: boolean;
  keywords: string;
}

export const categories: { id: CategoryId; label: string; short: string; hint: string }[] = [
  { id: "todos", label: "Todos los servicios", short: "Todos", hint: "Explorá las posibilidades" },
  { id: "eventos", label: "Eventos y producción", short: "Eventos", hint: "Dale vida a tu evento" },
  { id: "marca", label: "Activaciones y BTL", short: "Activaciones", hint: "Conectá con tu público" },
  { id: "contenido", label: "Audiovisual y contenido", short: "Audiovisual", hint: "Contá tu historia" },
  { id: "branding", label: "Diseño y branding", short: "Branding", hint: "Hacé visible tu marca" },
];

export const services: Service[] = [
  {
    id: "produccion-integral", category: "eventos", title: "Producción integral de eventos",
    description: "Una sola coordinación para convertir tu idea en una experiencia bien ejecutada.",
    photo: "tigres-del-norte.webp", alt: "Escenario del concierto de Los Tigres del Norte", position: "center 44%",
    includes: ["Planificación del evento", "Coordinación técnica", "Montaje y operación"],
    idealFor: "Eventos corporativos, conciertos, proms y celebraciones.",
    detail: "Coordinamos las áreas que tu evento necesita. Podemos integrar pantallas, sonido, iluminación y producción audiovisual en una misma propuesta, según el lugar, la fecha y el alcance.",
    keywords: "produccion organizacion evento concierto prom graduacion conferencia congreso lanzamiento boda corporativo montaje",
  },
  {
    id: "pantallas-led", category: "eventos", title: "Pantallas LED",
    description: "Contenido que se ve y se siente, desde una presentación hasta un gran escenario.",
    photo: "bronco.webp", alt: "Pantallas y escenario durante una presentación de Bronco", position: "center 44%",
    includes: ["Formato según el espacio", "Instalación de pantallas", "Operación durante el evento"],
    idealFor: "Conciertos, congresos, lanzamientos y experiencias de marca.",
    detail: "Definimos el formato de pantalla y el montaje de acuerdo con tu espacio y contenido. Las dimensiones, configuraciones especiales y disponibilidad se confirman al cotizar.",
    keywords: "pantalla led video visual cilindrica cilindro 360 proyeccion escenario",
  },
  {
    id: "sonido", category: "eventos", title: "Sonido profesional",
    description: "Voces claras y música con presencia para que tu mensaje llegue a todos.",
    photo: "aleks-syntek.webp", alt: "Presentación musical en vivo de Aleks Syntek", position: "center 44%",
    includes: ["Configuración de audio", "Prueba de sonido", "Operación técnica"],
    idealFor: "Charlas, eventos empresariales, presentaciones y conciertos.",
    detail: "Planteamos el sistema de sonido según el recinto, la audiencia y las necesidades de voces o música. El equipo específico y la cantidad de micrófonos se definen en la propuesta.",
    keywords: "audio sonido microfono musica banda conferencia parlantes dj",
  },
  {
    id: "iluminacion", category: "eventos", title: "Iluminación de eventos",
    description: "Creá el ambiente y destacá los momentos que hacen especial tu evento.",
    photo: "los-pericos.webp", alt: "Iluminación del escenario durante el concierto de Los Pericos", position: "center 46%",
    includes: ["Propuesta de ambiente", "Montaje de iluminación", "Operación durante el evento"],
    idealFor: "Escenarios, bodas, proms, eventos corporativos y lanzamientos.",
    detail: "La iluminación acompaña la identidad y los momentos de tu evento. Combinamos ambientación y necesidades escénicas de acuerdo con el espacio y la propuesta aprobada.",
    keywords: "iluminacion luces ambiente boda prom escenario concierto corporativo",
  },
  {
    id: "activaciones-btl", category: "marca", title: "Activaciones de marca",
    description: "Llevá tu marca al encuentro de las personas con una experiencia participativa.",
    photo: "cm-airlines-activacion.webp", alt: "Actividad de marca de CM Airlines con presentadores y pantalla", position: "center 43%",
    includes: ["Concepto de la actividad", "Coordinación del montaje", "Dinámicas con el público"],
    idealFor: "Lanzamientos, centros comerciales, ferias y puntos de venta.",
    detail: "Construimos una propuesta que conecte tu marca con el público. Definimos contigo la dinámica, el lugar y los recursos necesarios, desde una acción puntual hasta una activación con varias áreas.",
    keywords: "btl activacion marca experiencia lanzamiento promocion tienda punto venta feria",
  },
  {
    id: "degustaciones-promocion", category: "marca", title: "Degustaciones y promoción",
    description: "Acercá tu producto a las personas para que puedan conocerlo y probarlo.",
    photo: "evento-social.webp", alt: "Personas participando en una actividad del portafolio de On Media",
    includes: ["Propuesta de dinámica", "Coordinación en el punto", "Logística promocional"],
    idealFor: "Productos nuevos, comercios, ferias y campañas de temporada.",
    detail: "Podés consultar por actividades de degustación, demostración o promoción. El tipo de personal, los materiales, el producto y la cobertura se acuerdan según cada proyecto.",
    needsReview: true, keywords: "degustacion sampling promocion producto demostracion impulsacion",
  },
  {
    id: "personal-promocional", category: "marca", title: "Personal para activaciones",
    description: "Acompañamiento para recibir, orientar y conectar con el público de tu marca.",
    photo: "cm-airlines-evento.webp", alt: "Asistentes durante un evento de CM Airlines", position: "center 46%",
    includes: ["Perfil según la actividad", "Coordinación de participación", "Apoyo a la experiencia"],
    idealFor: "Lanzamientos, activaciones, exhibiciones y eventos comerciales.",
    detail: "Consultá disponibilidad de personal promocional y animación. Los perfiles, las funciones, los horarios y la cantidad de personas se confirman antes de contratar.",
    needsReview: true, keywords: "promotores edecanes modelos animadores presentadores staff personal",
  },
  {
    id: "produccion-audiovisual", category: "contenido", title: "Producción audiovisual",
    description: "Imágenes y sonido que cuentan lo que hace diferente a tu marca.",
    photo: "produccion-audiovisual.webp", alt: "Grabación de contenido audiovisual en un punto de venta", position: "center 40%",
    includes: ["Enfoque de la pieza", "Grabación en locación", "Edición y entrega acordada"],
    idealFor: "Videos de marca, productos, campañas y comunicación empresarial.",
    detail: "Damos forma al mensaje y al contenido audiovisual que necesitás. Definimos el objetivo, la duración, las locaciones y los formatos de entrega antes de producir.",
    keywords: "video audiovisual grabacion comercial television tv produccion foto filmacion marca producto",
  },
  {
    id: "cobertura-eventos", category: "contenido", title: "Cobertura de eventos",
    description: "Conservá y compartí los momentos importantes, incluso después del evento.",
    photo: "boda.webp", alt: "Invitados disfrutando de una celebración de boda", position: "center 44%",
    includes: ["Momentos clave a cubrir", "Registro audiovisual", "Resumen en formato acordado"],
    idealFor: "Eventos corporativos, conferencias, conciertos y celebraciones.",
    detail: "Planificamos qué momentos registrar y para qué canales se usará el material. La duración de cobertura, el equipo y las piezas finales se definen en la cotización.",
    keywords: "cobertura evento memoria resumen aftermovie video foto boda prom conferencia",
  },
  {
    id: "contenido-digital", category: "contenido", title: "Contenido digital",
    description: "Transformá tus ideas en piezas claras y listas para comunicar en tus canales.",
    photo: "produccion-audiovisual.webp", alt: "Producción de contenido para una marca en locación", position: "right center",
    includes: ["Objetivo de comunicación", "Edición o diseño de piezas", "Formatos por canal"],
    idealFor: "Redes sociales, campañas, presentaciones de productos y marcas.",
    detail: "Consultá por edición de video, diseño de publicaciones y piezas digitales. La cantidad de entregables, las revisiones y los plazos dependen del alcance aprobado.",
    needsReview: true, keywords: "contenido digital redes sociales reels tiktok instagram edicion diseno infografia",
  },
  {
    id: "branding-montaje", category: "branding", title: "Branding para espacios",
    description: "Hacé reconocible tu marca en el espacio donde sucede la experiencia.",
    photo: "cm-airlines-activacion.webp", alt: "Identidad de marca en una actividad de CM Airlines", position: "center 50%",
    includes: ["Adaptación de identidad", "Propuesta de aplicaciones", "Coordinación de instalación"],
    idealFor: "Activaciones, ferias, lanzamientos y espacios de atención al público.",
    detail: "Proponemos aplicaciones de marca para el espacio del evento. Las medidas, los materiales y las condiciones de instalación se revisan para cada proyecto.",
    needsReview: true, keywords: "branding diseno marca espacio stand feria rotulacion montaje logo identidad",
  },
  {
    id: "materiales-promocionales", category: "branding", title: "Materiales promocionales",
    description: "Piezas físicas que acompañan tu campaña y mantienen presente tu marca.",
    photo: "cm-airlines-evento.webp", alt: "Evento corporativo del portafolio de On Media", position: "center 52%",
    includes: ["Diseño según la campaña", "Selección de materiales", "Producción según cantidades"],
    idealFor: "Promociones, puntos de venta, ferias y campañas empresariales.",
    detail: "Consultá opciones de impresión y artículos promocionales. Tipos de producto, materiales, cantidades mínimas, disponibilidad y tiempos se confirman con el equipo comercial.",
    needsReview: true, keywords: "impresos impresiones promocional merchandising vinil camisetas articulos materiales",
  },
];

export const cases = [
  { title: "Los Tigres del Norte", label: "Concierto · Gran formato", photo: "tigres-del-norte.webp", alt: "Escenario del concierto de Los Tigres del Norte", category: "eventos" as CategoryId },
  { title: "CM Airlines", label: "Experiencia de marca", photo: "cm-airlines-activacion.webp", alt: "Actividad de marca de CM Airlines", category: "marca" as CategoryId },
  { title: "Producción en locación", label: "Contenido audiovisual", photo: "produccion-audiovisual.webp", alt: "Grabación audiovisual en un punto de venta", category: "contenido" as CategoryId },
];

export const WHATSAPP_NUMBER = "50433558904";
export const WHATSAPP_DISPLAY = "+504 3355-8904";
export const SELECTION_KEY = "onmedia-catalogo-seleccion-v1";

export function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function filterServices(category: CategoryId, query: string): Service[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  return services.filter((service) => {
    const text = normalize([service.title, service.description, service.idealFor, service.keywords, ...service.includes].join(" "));
    return (category === "todos" || service.category === category) && tokens.every((token) => text.includes(token));
  });
}

export function readSelection(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const values: unknown = JSON.parse(raw);
    if (!Array.isArray(values)) return [];
    return [...new Set(values.filter((id): id is string => typeof id === "string" && services.some((s) => s.id === id)))];
  } catch { return []; }
}

export interface QuoteFields {
  name: string; company: string; city: string; date: string; message: string;
}

export function formatDate(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Por definir";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function buildMessage(selected: Service[], scope: Scope, fields: QuoteFields): string {
  const bounded = (value: string, length: number) => value.trim().slice(0, length);
  return [
    "Hola, On Media. Me gustaría consultar una propuesta.",
    "",
    `Nombre: ${bounded(fields.name, 80)}`,
    ...(fields.company.trim() ? [`Empresa: ${bounded(fields.company, 100)}`] : []),
    `Lugar: ${bounded(fields.city, 120)}`,
    `Fecha aproximada: ${formatDate(fields.date)}`,
    `Necesito: ${scope === "integral" ? "Una solución integral" : "Servicios puntuales"}`,
    "",
    "Servicios que me interesan:",
    ...selected.map((service) => `• ${service.title}${service.needsReview ? " (consultar disponibilidad)" : ""}`),
    ...(fields.message.trim() ? ["", `Sobre el proyecto: ${bounded(fields.message, 700)}`] : []),
    "",
    "Quedo pendiente de confirmar alcance, disponibilidad y cotización. Gracias.",
  ].join("\n");
}

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
