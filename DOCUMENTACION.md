# 📚 Documentación - Neurallyz Cybersecurity Assessment

## 📋 Descripción General

Este proyecto es una **aplicación web de evaluación de ciberseguridad** desarrollada con **React 18** y **Vite**. Permite a las organizaciones realizar un autodiagnóstico de su madurez en ciberseguridad basado en **NIST CSF 2.0** y **CSPR v3** a través de un cuestionario interactivo organizado por 6 pilares.

---

## 🏗️ Arquitectura del Código

### Estructura de Carpetas

```
src/
├── components/              # Componentes UI reutilizables
│   ├── index.js            # Exportaciones centralizadas
│   ├── Navbar.jsx          # Barra de navegación superior
│   ├── Welcome.jsx         # Pantalla de bienvenida/formulario
│   ├── Assessment.jsx      # Pantalla principal del cuestionario
│   ├── Results.jsx         # Pantalla de resultados/mapa de calor
│   ├── RecoveryModal.jsx   # Modal para recuperar progreso
│   ├── PillarNavigation.jsx # Breadcrumb de navegación por pilares
│   ├── QuestionCard.jsx    # Tarjeta de pregunta individual
│   └── PillarIcon.jsx      # Renderizador de iconos por pilar
├── data/
│   └── assessmentData.js   # Datos del cuestionario (pilares, preguntas)
├── hooks/
│   ├── useAssessment.js    # Hook principal con toda la lógica
│   └── useLocalStorage.js  # Hook para persistencia en localStorage
├── utils/
│   └── helpers.js          # Funciones utilitarias (sanitize, validators)
├── App.jsx                 # Componente orquestador principal (~110 líneas)
├── main.jsx                # Entry point de React
└── index.css               # Estilos Tailwind CSS
```

### Principios de Arquitectura

| Principio | Implementación |
|-----------|----------------|
| **Separación de responsabilidades** | Lógica en hooks, UI en componentes |
| **Componentes reutilizables** | Cada componente tiene una única responsabilidad |
| **Optimización de rendimiento** | `useMemo` y `useCallback` para evitar re-renders |
| **Persistencia** | localStorage con hook dedicado |
| **Seguridad** | Sanitización de inputs, validación de email |

---

## 📊 Datos del Assessment (ASSESSMENT_DATA)

### Pilares de Evaluación

La evaluación se divide en **6 pilares principales** basados en NIST CSF 2.0:

| # | ID | Nombre | Descripción |
|---|-----|--------|-------------|
| 1 | GOVERN | Gobernanza y Estrategia | Visión estratégica, BIA, roadmap |
| 2 | CLOUD_IDENTITY | Cloud Identity & IAM | Super Admin, Domain Restriction, Service Accounts |
| 3 | PERIMETER | Seguridad Perimetral | Inventario, hardening, cifrado |
| 4 | PROTECT | Protección de Datos | MFA, clasificación, pen testing |
| 5 | DETECT_RESPOND | Detección y Respuesta | SOC 24/7, SIEM, procedimientos |
| 6 | RECOVER | Recuperación e Inmutabilidad | Backups inmutables, DRP, capacitación |

Cada pilar contiene **3 preguntas** con pesos de 3-5 según criticidad.
**Total: 18 preguntas**

### Niveles de Madurez

| Nivel | Nombre | Descripción | Color |
|-------|--------|-------------|-------|
| 1 | Inexistente | Sin proceso ni herramienta. Riesgo máximo | #ef4444 (rojo) |
| 2 | Inicial | Procesos reactivos y no documentados | #f97316 (naranja) |
| 3 | Definido | Políticas documentadas y herramientas básicas | #eab308 (amarillo) |
| 4 | Optimizado | Monitoreo constante y mejora continua | #22c55e (verde) |

---

## 🔄 Flujo de la Aplicación

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   WELCOME   │ --> │   ASSESSMENT     │ --> │   RESULTS   │
│  (Inicio)   │     │ (6 Pilares)      │     │ (Mapa Calor)│
└─────────────┘     └──────────────────┘     └─────────────┘
      │                     │                       │
      ▼                     ▼                       ▼
  - Nombre              - Breadcrumb nav       - Score global
  - Email (opcional)    - 3 preguntas/pilar    - Score por pilar
  - Empresa             - Validación           - Recomendaciones
  - Cloud Provider      - localStorage         - Exportar PDF
```

### Pantalla 1: Welcome (`Welcome.jsx`)
- Formulario de datos del cliente
- Campos: Nombre, Email (opcional), Empresa, Cloud Provider
- Validación de email con regex
- Sanitización de inputs (prevención XSS)
- Botón deshabilitado hasta completar campos requeridos

### Pantalla 2: Assessment (`Assessment.jsx`)
- Navegación breadcrumb por pilares (completados en verde ✓)
- Barra de progreso visual
- 3 preguntas por pilar con 4 opciones de nivel
- **Validación**: No avanza sin responder todas las preguntas del pilar
- **Persistencia**: Guarda automáticamente en localStorage
- **Recuperación**: Modal para continuar assessment previo

### Pantalla 3: Results (`Results.jsx`)
- Score global con indicador visual (rojo/amarillo/verde)
- Mapa de calor por pilar con barras de progreso
- Descripciones dinámicas según nivel de madurez
- Recomendaciones basadas en cloud provider
- Botón para exportar PDF (window.print)

---

## 🧮 Cálculo de Puntuaciones

La función `calculateScores()` en `utils/helpers.js`:

```javascript
// Fórmula por pilar:
score = (Σ(respuesta × peso)) / (Σ(4 × peso)) × 100

// Ejemplo con 3 preguntas (pesos 5, 5, 4):
// Respuestas: Nivel 3, Nivel 2, Nivel 4
// suma = (3×5) + (2×5) + (4×4) = 15 + 10 + 16 = 41
// máximo = (4×5) + (4×5) + (4×4) = 20 + 20 + 16 = 56
// score = (41/56) × 100 = 73.2%

// Score global = promedio de los 6 pilares
```

### Niveles de Resultado

| Score | Estado | Color |
|-------|--------|-------|
| < 40% | Riesgo Crítico | Rojo |
| 40-69% | Mejora Necesaria | Amarillo |
| ≥ 70% | Nivel Resiliente | Verde |

---

## 🎨 Dependencias y Librerías

### Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.2.0 | Framework UI |
| Vite | 5.x | Build tool y dev server |
| Tailwind CSS | 4.1.x | Estilos (via @tailwindcss/vite) |
| lucide-react | latest | Iconografía |

### Iconos Utilizados (lucide-react)

| Icono | Componente | Uso |
|-------|------------|-----|
| `Shield` | Navbar, Welcome, Results | Logo principal, GOVERN |
| `Cloud` | PillarIcon | CLOUD_IDENTITY |
| `Eye` | PillarIcon | PERIMETER |
| `Lock` | PillarIcon | PROTECT |
| `Activity` | PillarIcon | DETECT_RESPOND |
| `RefreshCcw` | PillarIcon, RecoveryModal | RECOVER |
| `Users`, `Mail`, `Settings` | Welcome | Campos del formulario |
| `Check`, `Circle` | PillarNavigation | Estado de pilares |
| `ChevronLeft/Right` | Assessment | Navegación |
| `AlertTriangle` | Assessment | Errores de validación |
| `BarChart3` | Assessment | Botón finalizar |
| `Target`, `FileSpreadsheet` | Results | Recomendaciones |

### Paleta de Colores (Tailwind)
- **Primario**: blue-700 (#1d4ed8)
- **Backgrounds**: slate-50, white
- **Success**: emerald-500/600
- **Warning**: amber-500
- **Error**: rose-500

---

## ⚙️ Hooks Personalizados

### `useAssessment()` - Hook Principal

Ubicación: `src/hooks/useAssessment.js`

Centraliza toda la lógica de la aplicación:

```javascript
const {
  // Estados
  step,                  // 'welcome' | 'assessment' | 'results'
  currentPillarIdx,      // 0-5
  responses,             // { questionId: levelValue }
  clientInfo,            // { name, email, company, cloud_provider }
  isSubmitting,          // boolean
  validationError,       // string
  showRecoveryModal,     // boolean
  
  // Datos calculados (memoizados)
  currentPillar,         // Objeto del pilar actual
  pillars,               // Array de todos los pilares
  maturityLevels,        // Array de niveles [1-4]
  scores,                // { pillarId: scorePercent }
  averageScore,          // Promedio global
  progress,              // Porcentaje de progreso
  
  // Acciones
  handleResponse,        // (questionId, value) => void
  handleNextPillar,      // () => boolean
  handlePrevPillar,      // () => void
  handleFinish,          // () => Promise<boolean>
  navigateToPillar,      // (idx) => void
  startAssessment,       // () => void
  restoreProgress,       // () => void
  startFresh,            // () => void
  
  // Validación
  isPillarComplete,      // (idx) => boolean
  isAssessmentComplete,  // () => boolean
} = useAssessment();
```

### `useLocalStorage()` - Persistencia

Ubicación: `src/hooks/useLocalStorage.js`

```javascript
const [value, setValue, removeValue] = useLocalStorage('key', initialValue);
```

---

## 🛡️ Seguridad Implementada

### Sanitización de Inputs

```javascript
// src/utils/helpers.js
const sanitize = (str) => {
  if (!str) return '';
  return str
    .replace(/<[^>]*>/g, '')     // Elimina tags HTML
    .replace(/[<>"'&]/g, '')     // Elimina caracteres peligrosos
    .trim()
    .slice(0, 100);              // Limita longitud
};
```

### Validación de Email

```javascript
const isValidEmail = (email) => {
  if (!email) return true; // Es opcional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Validaciones de Negocio
- No se puede avanzar sin completar todas las preguntas del pilar
- No se puede finalizar sin completar todo el assessment
- Los botones se deshabilitan visualmente cuando no están disponibles

---

## 🛠️ Instalación y Ejecución

### Requisitos

- **Node.js**: 18.x o superior (LTS)
- **npm**: 9.x o superior

### Instalación Rápida

```bash
# 1. Clonar o descargar el proyecto
cd neuralliz-assessment

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo (Vite) |
| `npm run build` | Genera build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |

---

## 📦 Estructura del package.json

```json
{
  "name": "neuralliz-assessment",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.469.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "@tailwindcss/vite": "^4.1.3",
    "tailwindcss": "^4.1.3",
    "vite": "^5.4.14"
  }
}
```

---

## 🌐 Embeber en Página Web

### Opción 1: Build Estático (Recomendada)

```bash
npm run build
```

Esto genera una carpeta `dist/` con:
- `index.html`
- `assets/` (JS y CSS minificados)

Sube estos archivos a tu servidor y enlaza el script.

### Opción 2: iframe

```html
<iframe 
  src="https://tu-dominio.com/assessment" 
  width="100%" 
  height="900"
  frameborder="0"
></iframe>
```

### Opción 3: Microfrontend

Configura Vite para exportar como librería:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'NeurallyzAssessment',
      fileName: 'neurallyz-assessment'
    }
  }
});
```

---

## 🔧 Mejoras Futuras

| Prioridad | Mejora | Estado |
|-----------|--------|--------|
| 🔴 Alta | Conectar con Google Sheets API | Pendiente |
| 🔴 Alta | Backend para validación server-side | Pendiente |
| 🟡 Media | Exportar PDF real con jsPDF | Pendiente |
| 🟡 Media | Recomendaciones dinámicas por pilar bajo | Pendiente |
| 🟢 Baja | Gráficos interactivos con Chart.js | Pendiente |
| 🟢 Baja | Sistema de autenticación | Pendiente |
| 🟢 Baja | Historial de evaluaciones | Pendiente |

---

## 🐛 Solución de Problemas

| Problema | Solución |
|----------|----------|
| Puerto 5173 ocupado | Vite usa automáticamente 5174, 5175... |
| Estilos no se aplican | Verificar `@import "tailwindcss"` en index.css |
| Error de importación | Verificar que todos los paths sean relativos (`./`, `../`) |
| localStorage no funciona | Verificar que no esté en modo incógnito |
| Modal no aparece | Limpiar localStorage: `localStorage.clear()` |

---

## 📞 Información del Proyecto

- **Nombre**: Neurallyz Cybersecurity Assessment
- **Framework**: React 18 + Vite 5
- **Estándares**: NIST CSF 2.0, CSPR v3, CIS v8, ISO 27001
- **Licencia**: Propietary

---

*Documentación actualizada el 6 de febrero de 2026*
*Versión 2.0 - Arquitectura modular con componentes separados*
