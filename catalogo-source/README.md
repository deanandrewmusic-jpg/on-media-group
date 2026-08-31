# Catálogo On Media — previsualización comercial

Catálogo independiente del sitio publicado. No modifica la portada, el portafolio ni la web de cPanel.

## Ejecutar

```sh
npm install
npm test
npm run typecheck
npm run build
```

El resultado estático se genera en `../catalogo-preview/`, con rutas relativas. Para llevarlo a cPanel después de aprobarlo, se copia el **contenido** de esa carpeta dentro de `/public_html/catalogo/`. No reemplazar `/public_html` ni el sitio principal.

## Actualizar contenido

- `src/catalog.ts`: servicios, categorías, alcance orientativo, palabras de búsqueda y número de WhatsApp.
- `public/images/`: fotografías reales ya suministradas para el sitio, sin recreación por IA.
- `src/styles.css`: colores, tipografía Geist, diseño y tamaños adaptables.
- `src/main.tsx`: exploración, selección y formulario de consulta.

## Validación con Melissa antes de distribuirlo a clientes

1. Confirmar servicios, alcance, fotos autorizadas y contacto comercial.
2. Revisar especialmente degustaciones, personal promocional, contenido digital, branding y materiales promocionales (`needsReview: true`): provienen de la presentación anterior y no se afirman como oferta vigente.
3. Completar o corregir las prestaciones orientativas de cada ficha; no se publican precios, capacidades de equipos, métricas ni paquetes inventados.
4. Después de aprobar, actualizar los avisos de vista previa y `needsReview`; ajustar los metadatos Open Graph a la dirección final y decidir si habilitar indexación.

Las fotografías se presentan como referencias del portafolio, sin atribuir un alcance técnico específico a un proyecto a partir de su imagen.

## Privacidad y funcionamiento

- Sin backend, cuentas, seguimiento ni pagos.
- Solo los identificadores de servicios seleccionados se conservan en `sessionStorage` en este navegador.
- Los datos del formulario permanecen en memoria; no se incluyen en el enlace para compartir.
- WhatsApp abre una consulta prellenada para `+504 3355-8904`. El usuario tiene que pulsar Enviar en WhatsApp; no se envían mensajes automáticamente.
- Consulta no equivale a reserva. Alcance, fecha, disponibilidad y precio quedan por confirmar.

## Publicación

Esta previsualización añade únicamente `catalogo-preview/` y `catalogo-source/` al repositorio. No modifica las rutas actuales `photo-preview/`, `preview/` ni la raíz publicada.
