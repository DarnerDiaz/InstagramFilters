# Project Structure Guide

## Estructura del Proyecto

``` 
InstagramFilters/
│
├── 📄 package.json              ← Configuración npm y dependencias
├── 📄 tsconfig.json             ← Configuración TypeScript
├── 📄 .eslintrc.json            ← Reglas de linting
├── 📄 .gitignore                ← Archivos a ignorar en git
├── 📄 README.md                 ← Documentación principal ⭐ EMPIEZA AQUÍ
├── 📄 QUICKSTART.md             ← Guía rápida de 5 minutos
├── 📄 SECURITY.md               ← Información de seguridad y riesgos
├── 📄 TROUBLESHOOTING.md        ← Solución de problemas en español
├── 📄 CONTRIBUTING.md           ← Cómo contribuir
├── 📄 CHANGELOG.md              ← Historial de cambios
├── 📄 LICENSE                   ← MIT License
│
├── src/                         ← 💻 CÓDIGO FUENTE (TypeScript)
│   ├── main.ts                  ← App principal + UI (la mayor parte del código)
│   ├── instagram-scraper.ts     ← Extrae datos de Instagram
│   ├── filter-engine.ts         ← Lógica de filtrado
│   └── types.ts                 ← Interfaces TypeScript
│
├── scripts/                     ← 🔨 SCRIPTS DE BUILD
│   └── generate-bookmarklet.js  ← Genera versión bookmarklet
│
├── dist/                        ← 📦 ARCHIVOS COMPILADOS (GENERADO)
│   ├── bookmarklet.js           ← Código compilado y minificado
│   ├── bookmarklet-url.txt      ← Versión para crear bookmark
│   ├── console-paste.js         ← Código para pegar en consola
│   └── index.html               ← Página de instalación web
│
└── docs/                        ← 📚 DOCUMENTACIÓN ADICIONAL (futuro)
    ├── API.md                   ← Referencia de API
    ├── ARCHITECTURE.md          ← Explicación de arquitectura
    └── EXAMPLES.md              ← Ejemplos de uso
```

## Archivos Importantes para Usuarios

### Para Empezar
1. **[README.md](README.md)** - Documentación completa ⭐
2. **[QUICKSTART.md](QUICKSTART.md)** - Setup en 5 minutos
3. **[SECURITY.md](SECURITY.md)** - Información de seguridad

### Para Problemas
4. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Soluciones
5. **[CHANGELOG.md](CHANGELOG.md)** - Qué hay de nuevo

### Para Desarrolladores
6. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Cómo contribuir
7. **src/** - Código fuente TypeScript

## Archivos Importantes para Desarrolladores

### Source Code (src/)
```
src/
├── main.ts (600+ líneas)
│   ├── Class: InstagramFilterApp
│   │   ├── UI generation
│   │   ├── Event handlers
│   │   ├── State management
│   │   └── Data persistence
│   └── Features:
│       ├── Tab switching
│       ├── Scanning (following/followers)
│       ├── Advanced filtering
│       ├── Bulk selection
│       ├── Mass unfollow
│       ├── Export/Import
│       └── Settings management
│
├── instagram-scraper.ts (250+ líneas)
│   ├── Static Class: InstagramScraper
│   │   ├── getFollowingList()
│   │   ├── getFollowersList()
│   │   └── getUserDetails()
│   └── Utilities:
│       ├── parseNumber()
│       ├── waitForElement()
│       ├── delay()
│       └── extractProfileData()
│
├── filter-engine.ts (150+ líneas)
│   ├── Static Class: FilterEngine
│   │   ├── applyFilters()
│   │   ├── matchesCriteria()
│   │   ├── getStats()
│   │   └── getPreset()
│   └── Preset Filters:
│       ├── not-following-back
│       ├── ghost-followers
│       ├── fake-accounts
│       └── inactive
│
└── types.ts (100+ líneas)
    ├── Interface: IGUser
    ├── Interface: FilterCriteria
    ├── Interface: AppState
    └── Interface: UIConfig
```

## Flujo de Construcción

```
source code               build              output
───────────────────────────────────────────────────────

src/main.ts          ┐
src/types.ts         │ esbuild (bundler) →  dist/bookmarklet.js
src/scraper.ts       │                      (minificado ~30KB)
src/filter.ts        ┘

                     ↓ generate-bookmarklet.js script

                     ┌─→ dist/bookmarklet-url.txt (para browser)
                     ├─→ dist/console-paste.js (para consola)
                     └─→ dist/index.html (interfaz instalación)
```

## Cómo Usar los Archivos Generados

### Para Usuarios
1. **dist/console-paste.js** - Copiar y pegar en console
2. **dist/bookmarklet-url.txt** - Crear bookmark en navegador
3. **dist/index.html** - Página web para fácil instalación

### Para Desarrolladores
1. **dist/bookmarklet.js** - El código compilado
2. **dist/** - Todo está listo para distribuir
3. **src/** - Original source para editar

## Configuración por Defecto

### Build Configuration (package.json)
```json
{
  "scripts": {
    "build": "esbuild src/main.ts --bundle --minify",
    "dev": "esbuild src/main.ts --watch",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts"
  }
}
```

### TypeScript Strict Mode (tsconfig.json)
- Strict type checking enabled
- No implicit any
- Strict null checks
- ES2020 target

### ESLint Rules (.eslintrc.json)
- No console logs (can override)
- Prefer const
- No var allowed
- Strict equality (===)

## Tamaño de Archivos

```
src/main.ts          ~1000 líneas
src/instagram-scraper.ts ~300 líneas
src/filter-engine.ts ~180 líneas
src/types.ts         ~100 líneas
─────────────────────────────
Total source:        ~1580 líneas

dist/bookmarklet.js  ~30KB (minificado)
dist/console-paste.js~30KB (sin minificar, para legibilidad)
```

## Como Estructura se Expande (v1.1+)

```
Future additions:
├── src/
│   ├── analytics.ts          ← Análisis de engagement
│   ├── export-formats.ts     ← CSV, Excel, etc.
│   ├── comparison.ts         ← Comparar snapshots
│   ├── scheduling.ts         ← Acciones programadas
│   ├── api-integration.ts    ← API oficial de Instagram
│   └── ui-themes.ts          ← Soporte múltiples temas
│
├── tests/                    ← Test suite
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── docs/
    ├── api/                  ← Documentación detallada
    ├── guides/               ← Guías por tema
    └── schema/               ← JSON schemas
```

## Recursos Útiles

### Para Entender el Código
- TypeScript handbook
- Modern JavaScript patterns
- DOM API documentation
- ES2020 features

### Para Desplegar
- GitHub Pages (hosting)
- Unpkg (CDN)
- jsDelivr (CDN)

### Para Mantener
- ESLint para calidad
- Prettier para formato
- GitHub Actions para CI

---

**Última actualización**: Abril 2024
**Versión del proyecto**: 1.0.0
**Líneas de código**: ~1580
