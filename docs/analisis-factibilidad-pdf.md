# Análisis de Factibilidad — Botón "Descargar PDF" en Hero

> **Proyecto:** Portfolio Martin Farel (Svelte 5 + SvelteKit + Netlify)  
> **Fecha:** 15/05/2026  
> **Alcance:** Evaluar la viabilidad técnica, de UX y de performance de incorporar un botón principal en el banner (`Hero.svelte`) que genere y descargue un PDF cuyo contenido refleje fielmente la información expuesta en el sitio.

---

## 1. Resumen Ejecutivo

La funcionalidad es **factible** en todos los escenarios evaluados, pero presenta compensaciones claras entre fidelidad visual, peso del bundle, complejidad de mantenimiento y costo operativo. La decisión óptima depende de definir si el PDF busca ser un **screenshot fiel del sitio** o un **documento profesional tipo CV/Resume** derivado del mismo contenido.

| Escenario | Viabilidad | Esfuerzo | Bundle Impact | Recomendación |
|-----------|------------|----------|---------------|---------------|
| A. Cliente con `html2pdf.js` | Alta | Bajo | **Alto** (~600-900 KB gz) | Solo si se prioriza fidelidad visual sobre performance |
| B. Cliente con `pdfmake` | Alta | Medio | **Bajo** (~150-250 KB gz) | **Recomendado** — balance óptimo |
| C. Serverless con Puppeteer | Alta | Alto | **Nulo** | Ideal si se escala o se requiere calidad de impresión exacta |
| D. Precargar PDF estático | Muy Alta | Mínimo | Nulo | Descartado: no se basa dinámicamente en el contenido de la página |

**Recomendación general:** Implementar la **Opción B (`pdfmake`)** como primera iteración. Genera un PDF limpio, profesional, traducible y con un impacto de bundle razonable.

---

## 2. Requerimientos Funcionales Derivos

### 2.1. Origen del contenido
Toda la información del sitio reside en archivos de traducción estáticos (`es.json` / `en.json`) consumidos vía `svelte-i18n`. Esto implica que:

- El contenido del PDF ya está **disponible en tiempo de ejecución** en el store `$locale`.
- No es necesario hacer scraping del DOM para obtener el texto.
- Cualquier cambio en los JSONs se refleja automáticamente en el sitio **y potencialmente en el PDF**, siempre que el generador consuma los mismos keys.

### 2.2. Secciones a incluir
Basado en `+page.svelte` y los archivos de i18n, el PDF debería contener:

| Sección | Fuente i18n | Complejidad de maquetado |
|---------|-------------|--------------------------|
| Encabezado / Datos personales | `hero.*` | Baja |
| Perfil / Sobre mí | `about.p1-p3` | Media (contiene HTML `<strong>`) |
| Proyectos destacados | `projects.dashboard/ecommerce/design` | Media (cards con tags) |
| Experiencia laboral | `experience.jobs.*` | Media (lista cronológica) |
| Stack tecnológico | `stack.skills.*`, `stack.aiSkills.*` | Alta (muchas categorías y tags) |
| Contacto | `contact.*` | Baja |

### 2.3. Internacionalización (i18n)
El PDF debe respetar el idioma activo (`es` o `en`). Esto es trivial si el generador consume los stores de `svelte-i18n`, pero **no es automático** en librerías que hagan captura del DOM (como `html2canvas`), ya que renderizarían el idioma que esté visible en ese momento.

---

## 3. Opciones Técnicas — Análisis Detallado

### 3.1. Opción A: `html2pdf.js` (html2canvas + jsPDF)
**Mecanismo:** Renderiza una porción del DOM a canvas, la convierte a imagen y la inserta en un PDF.

**Pros:**
- Fidelidad visual absoluta: tipografías, colores, layout y estilos CSS se respetan sin esfuerzo adicional.
- Implementación rápida (una función, un selector CSS).

**Contras:**
- **Bundle size:** `html2canvas` (~180 KB) + `jsPDF` (~290 KB) + wrapper = **~600-900 KB gz**.
- **No es texto seleccionable:** el PDF resultante es una imagen rasterizada (a menos se use `html2pdf` con la opción `jsPDF` en modo vectorial, que es experimental y con bugs conocidos).
- **Problemas con fuentes web:** las fuentes cargadas vía `@font-face` pueden no renderizar correctamente en el canvas si no están completamente cargadas.
- **Fondo espacial y animaciones:** el sitio tiene un `SpaceBackground` con Three.js. Capturar el Hero incluiría elementos decorativos que no aportan valor en un PDF.
- **Dificultad para paginar:** si se captura toda la página, el corte entre páginas es arbitrario.

**Veredicto:** Descartable para un portfolio que prioriza la performance web. El costo de ~800 KB adicionales en un sitio que hoy pesa probablemente menos de 500 KB de JS es desproporcionado.

---

### 3.2. Opción B: `pdfmake` (Recomendada)
**Mecanismo:** Generador declarativo de PDFs. Se define el documento como un objeto JSON con estilos, y la librería lo compila a PDF binario nativo (texto vectorial).

**Pros:**
- **Bundle size:** ~150-250 KB gz. Aceptable.
- **PDF nativo:** texto seleccionable, búsqueda habilitada, accesible para lectores de pantalla.
- **Control total del layout:** se puede diseñar un CV profesional optimizado para impresión (A4), independiente del layout web.
- **Fácil i18n:** se inyectan los strings directamente desde el store de `svelte-i18n`.
- **Paginación explícita:** se controla dónde cortar (`pageBreak: 'before'`).
- **Sin dependencia del DOM:** no requiere que los componentes estén montados ni visibles.

**Contras:**
- Requiere "re-maquetar" el contenido en la sintaxis de `pdfmake` (tablas, stacks, columns).
- No soporta CSS; hay que redefinir estilos (aunque esto es también una ventaja para un CV limpio).
- Fuentes personalizadas requieren embed explícito (base64 o URL). Si se usan fuentes del sistema (Helvetica/Roboto), es trivial.

**Veredicto:** **Opción preferida.** El esfuerzo de maquetado es un pago único que se amortiza con un resultado profesional, ligero y mantenible.

---

### 3.3. Opción C: Serverless con Puppeteer / Playwright
**Mecanismo:** Un endpoint serverless (ej: Netlify Function) recibe el locale, renderiza una página HTML oculta con el contenido del CV, y devuelve el PDF generado por un navegador headless.

**Pros:**
- **Zero bundle impact.** Todo ocurre en el servidor.
- Calidad de impresión perfecta (motor Chromium).
- Se puede usar CSS `@media print` para un layout optimizado sin afectar el sitio público.
- Posibilidad de generar PDFs periódicamente (cron) o con contenido dinámico futuro.

**Contras:**
- **Cold start:** en Netlify Functions, el primer request puede tardar 2-6 segundos si Chromium no está warm.
- **Tamaño de la función:** Puppeteer/Playwright exceden el límite de 50 MB de Netlify Functions a menos se use `chrome-aws-lambda` o la capa de Chromium optimizada.
- **Complejidad:** requiere crear un endpoint, manejar la versión de Chromium, y una ruta `/cv.pdf` oculta.
- **Costo:** Netlify incluye 125k invocaciones/mes en el tier gratuito; es más que suficiente para un portfolio, pero es un factor a monitorear.

**Veredicto:** Viable si se planea escalar la funcionalidad (ej: generar CVs personalizados por URL), pero es overkill para un portfolio estático. **Segunda opción** si la B no cumple expectativas de diseño.

---

### 3.4. Opción D: Precargar PDF estático
**Mecanismo:** Diseñar manualmente un PDF en Figma/Illustrator, exportarlo a `/static/cv.pdf` y servirlo.

**Pros:**
- Cero código, cero bundle.
- Control de diseño absoluto.

**Contras:**
- **Incumple el requisito principal:** "toda la información tiene que estar basada en el contenido de la página". Si se actualiza un proyecto o un trabajo en `es.json`, el PDF queda desactualizado.
- Requiere regeneración manual en cada cambio de contenido.

**Veredicto:** Descartado por incumplimiento funcional.

---

## 4. Análisis de Contenido y Estructura del PDF

### 4.1. Formato ideal del documento
Un portfolio web y un CV/Resume son **medios distintos** con propósitos distintos:

- **Web:** inmersiva, espacial, animada, exploratoria.
- **PDF:** escaneable, imprimible, profesional, legible en blanco y negro.

Por lo tanto, el PDF no debería ser una réplica visual del sitio, sino una **síntesis estructurada** de su contenido. Se propone una estructura A4 de 1-2 páginas:

```
PÁGINA 1
─────────────────────────────────
MARTIN FAREL
UI/UX Designer — Fullstack Developer
[Links: martinfarel.dev | linkedin | github | email]
─────────────────────────────────
PERFIL
[about.p1-p3 resumido en 3-4 líneas]
─────────────────────────────────
EXPERIENCIA
OpenPass        2023 — 2026     Software Developer
[Growth, Fichap, Catek, Freelance...]
─────────────────────────────────
PROYECTOS DESTACADOS
Dashboard Analytics     SvelteKit / Node.js / PostgreSQL
E-Commerce Platform     Next.js / Stripe / MongoDB
Design System Library   React / Figma / Storybook
─────────────────────────────────
STACK TECNOLÓGICO
Frontend: Svelte, React, Angular, Next.js
Mobile:   Flutter, Kotlin, Dart
Backend:  NestJS, Node.js, PostgreSQL, Firebase
Design:   Figma, Illustrator, After Effects
AI:       OpenAI API, LangChain, GitHub Copilot
─────────────────────────────────
```

### 4.2. HTML embebido en i18n
Los párrafos de `about.p1-p2` contienen etiquetas `<strong>`. En `pdfmake` se puede sanitizar y convertir a `bold: true` en nodos de texto. Es manejable.

### 4.3. Imágenes
El sitio no muestra fotos de proyectos reales (solo cards de texto). El PDF puede omitir imágenes o incluir un ícono/avatar en el header. Si en el futuro se agregan screenshots de proyectos, `pdfmake` soporta `images` en base64 o URL.

---

## 5. Impacto en Performance

### 5.1. Bundle actual estimado
Según `package.json`, el proyecto usa:
- Svelte 5 + SvelteKit
- Three.js / Threlte (ya pesado)
- svelte-i18n (ligero)

El bundle de cliente actual probablemente ronda los **300-600 KB gz** solo por Three.js. Agregar `pdfmake` (+200 KB) elevaría el total pero no de forma crítica. Agregar `html2pdf.js` (+800 KB) sí sería problemático.

### 5.2. Code splitting
Tanto `pdfmake` como `html2pdf.js` pueden cargarse vía `import()` dinámico al hacer click en el botón, evitando que pesen en el bundle inicial. Esto es **mandatorio** para cualquier opción que se elija.

```typescript
// Ejemplo de lazy loading
async function generatePDF() {
  const pdfMake = await import('pdfmake/build/pdfmake');
  const vfs = await import('pdfmake/build/vfs_fonts');
  pdfMake.vfs = vfs.default;
  // ... generar documento
}
```

---

## 6. UX / UI del Botón en el Hero

### 6.1. Jerarquía visual actual
El Hero tiene:
- Botón primario: "Ver proyectos" (anchor a `#projects`)
- Botón secundario: "Contactar" (anchor a `#contact`)

### 6.2. Propuesta de integración
Se recomienda reemplazar o complementar el CTA actual con un **tercer botón** o convertir el botón primario en una acción dual. Opciones:

**Opción A: Tres botones (recomendada)**
```
[Ver proyectos]  [Descargar CV]  [Contactar]
```
- "Descargar CV" puede tener un ícono de PDF o flecha de descarga.
- En mobile se apilan verticalmente (ya existe `flex-direction: column` en `@media`).

**Opción B: Reemplazar CTA secundario**
El botón "Contactar" pasa a ser "Descargar CV", y el contacto se deja solo en la sección inferior.

**Opción C: Botón flotante / Navbar**
Menos invasivo, pero menos prominente. El usuario pidió "botón principal en el banner".

### 6.3. Estados del botón
- **Default:** "Descargar CV" / "Download CV"
- **Loading:** "Generando..." / "Generating..." (spinner)
- **Success:** Disparo automático de `download`
- **Error:** "Error. Reintentar" / "Error. Try again"

---

## 7. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Bundle excesivo con librería incorrecta | Media | Alto | Usar `import()` dinámico; elegir `pdfmake` |
| Fuentes no renderizan en PDF | Media | Medio | Usar fuentes estándar embebidas (Roboto) en `pdfmake` |
| Desfasaje contenido web vs PDF | Alta (a largo plazo) | Medio | Centralizar definición del contenido en los JSONs de i18n y hacer que el generador los consuma directamente |
| Tiempo de generación lento en mobile | Media | Medio | Mostrar feedback visual inmediato (spinner); la generación es local y rápida (< 1s) |
| Compatibilidad navegadores | Baja | Medio | `pdfmake` soporta todos los navegadores modernos; fallback a mensaje si falla |

---

## 8. Recomendación Final

### 8.1. Estrategia recomendada: **Opción B (`pdfmake`) con lazy loading**

1. **Instalar:** `npm install pdfmake` + `@types/pdfmake`.
2. **Crear un servicio:** `src/lib/services/pdfGenerator.ts` que:
   - Reciba el locale actual.
   - Arme el documento `pdfmake` consumiendo los mismos `$_()` o directamente los JSONs de i18n.
   - Devuelva el blob para descarga.
3. **Agregar botón en Hero:**
   - Nuevo botón `"Descargar CV"` / `"Download CV"` al lado de los existentes.
   - Ícono opcional (SVG inline, sin librerías).
   - Lazy load del generador al hacer click.
4. **Estilos del PDF:** diseño limpio, monocromático o con el color de marca (`#161e3c`), optimizado para A4.
5. **Pruebas:** verificar en Chrome, Firefox, Safari y mobile.

### 8.2. Alternativa escalable: **Opción C (Serverless)**
Si en el futuro el portfolio crece (más proyectos, contenido dinámico desde CMS, o múltiples idiomas con RTL), evaluar migrar a un endpoint `/api/cv.pdf` con Playwright.

---

## 9. Estimación de Esfuerzo

| Tarea | Opción B (pdfmake) | Opción C (Serverless) |
|-------|-------------------|----------------------|
| Instalación y configuración | 1 h | 4 h |
| Maquetado del documento PDF | 4-6 h | 2 h (CSS print) |
| Integración con i18n | 1 h | 1 h |
| Botón en Hero + estados | 1 h | 1 h |
| Testing cross-browser / mobile | 2 h | 2 h |
| Deploy y ajustes | 1 h | 3 h |
| **Total estimado** | **10-12 h** | **13-15 h** |

---

## 10. Próximos Pasos Sugeridos

1. [ ] **Decisión de UX:** ¿El PDF es un CV tradicional o una réplica del sitio? (Se recomienda CV tradicional).
2. [ ] **Aprobación de la estructura del documento:** definir qué secciones entran y en qué orden.
3. [ ] **Prototipo rápido:** generar un PDF de prueba con `pdfmake` y 2 secciones para validar calidad visual.
4. [ ] **Implementación completa** siguiendo la Opción B.
5. [ ] **Testing en dispositivos reales** (especialmente iOS Safari, que tiene particularidades con descargas de blobs).

---

*Documento generado para facilitar la toma de decisión antes de la implementación.*
