# 📸 Instagram Filters - Herramienta Avanzada de Gestión de Seguidores

Una herramienta poderosa y moderna para gestionar y filtrar masivamente tus seguidores de Instagram. Selecciona usuarios según criterios avanzados como número de seguidores, estado de seguimiento mutuo, perfiles privados y más.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-success)

## ✨ Características Principales

### 🔍 Escaneo Avanzado
- **Escanear Following**: Obtén lista completa de quién sigues
- **Escanear Followers**: Obtén lista completa de tus seguidores
- **Escaneo Dual**: Escanea ambas listas simultáneamente
- **Actualización en Tiempo Real**: Progreso visible mientras escanea

### 🎚️ Filtros Avanzados
- **Rango de Seguidores**: Filtra por número mínimo y máximo de seguidores
- **Estado de Seguimiento**:
  - Te sigue / No te sigue
  - Tú lo sigues / No lo sigues
- **Tipo de Perfil**:
  - Perfiles privados
  - Cuentas verificadas
  - Cuentas con biografía
  - Cuentas con sitio web
- **Búsqueda de Texto**: Busca por nombre de usuario, nombre completo o biografía

### ⚡ Filtros Rápidos Preconfigurados
1. **No siguen de vuelta**: Usuarios que sigues pero no te siguen
2. **Ghost Followers**: Cuentas inactivas/falsas (sin bio, privadas, pocos seguidores)
3. **Cuentas Falsas**: Perfiles privados con bajo engagement
4. **Inactivos**: Usuarios sin actividad reciente

### 📊 Selección Masiva
- Selecciona usuarios individuales
- Selecciona todo con un clic
- Deselecciona todo
- Invierte la selección
- **Unfollow masivo** de usuarios seleccionados

### 💾 Gestión de Datos
- **Exportar**: Descarga tus datos en formato JSON
- **Importar**: Carga datos previamente guardados
- **Historial**: Guarda múltiples análisis para comparación

### 🎨 Interfaz Moderna
- Diseño limpio estilo Apple
- Totalmente responsive
- Funciona en desktop y mobile
- Tema adaptado a Instagram

## 🚀 Instalación Rápida

### Opción 1: Pegar en Consola (5 segundos - SIN instalación)

1. **Abre Instagram** en tu navegador
2. **Abre DevTools**:
   - Windows: `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`
3. **Ve a la pestaña "Console"**
4. **Copia este escriptlet** y pégalo:

```javascript
(async function(){const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/gh/yourusername/InstagramFilters@latest/dist/bookmarklet.js",document.head.appendChild(e)})();
```

5. **Presiona Enter** - ¡Listo!

### Opción 2: Crear un Bookmarklet (Recómendado)

1. **Haz clic derecho** en tu barra de marcadores
2. **Selecciona "Agregar página"**
3. **Nombre**: `Instagram Filters`
4. **URL**: Copia el contenido de `dist/bookmarklet-url.txt`
5. **Guarda**
6. Ahora en cualquier momento en Instagram, ¡solo haz clic en el bookmark!

### Opción 3: Compilar Localmente

```bash
# Clonar o descargar el proyecto
git clone https://github.com/yourusername/InstagramFilters.git
cd InstagramFilters

# Instalar dependencias
npm install

# Compilar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# La versión compilada estará en dist/
```

## 📖 Guía de Uso

### 1️⃣ Escaneo Inicial

1. Abre la pestaña **"Scanner"**
2. Elige una opción:
   - 📥 **Escanear Following**: Analiza a quiénes sigues
   - 📤 **Escanear Followers**: Analiza a tus seguidores
   - 🔄 **Escanear Ambos**: Análisis completo
3. Espera a que termine el escaneo (mostrará progreso)

### 2️⃣ Aplicar Filtros

1. **Opción A - Filtros Rápidos** (Recomendado para principiantes):
   - Ve a la pestaña "Filtros"
   - Haz clic en uno de los botones preconfigurados:
     - "No siguen de vuelta"
     - "Ghost Followers"
     - "Cuentas Falsas"

2. **Opción B - Filtros Personalizados** (Para usuarios avanzados):
   - Configura manualmente cada parámetro:
     - Rango de seguidores (ej: 100-5000)
     - Estado de seguimiento
     - Tipo de perfil
     - Búsqueda de texto
   - Haz clic en **"Aplicar Filtros"**

### 3️⃣ Seleccionar Usuarios

1. Ve a la pestaña **"Resultados"**
2. Observa tus estadísticas:
   - Total escaneados
   - No te siguen
   - Perfiles privados
   - Ya seleccionados

3. Selecciona usuarios:
   - ☑️ Haz clic en checkboxes individuales
   - **"Seleccionar Todo"**: Selecciona todos los resultados
   - **"Invertir Selección"**: Cambia seleccionados/no seleccionados
   - Busca específicamente usando la barra de búsqueda

### 4️⃣ Acciones Masivas

Una vez seleccionados:
- **❌ Unfollow Seleccionados**: Deja de seguir a todos los seleccionados
- Se requiere confirmación antes de proceder
- Verás progreso en tiempo real

### 5️⃣ Exportar/Importar Datos

En la pestaña **"Configuración"**:

- **💾 Exportar Datos**: 
  - Descarga JSON con todos tus datos
  - Útil para análisis posterior
  - Compatible con versión Web

- **📂 Importar Datos**:
  - Carga un JSON previamente exportado
  - Útil para recontinuar análisis
  - Mantén múltiples snapshots temporales

## 🎯 Casos de Uso

### 1. Limpiar Ghost Followers
```
Filtro Rápido → "Ghost Followers" → Selecciona Todo → Unfollow
```
Deja de seguir cuentas falsas/inactivas sin esfuerzo.

### 2. Identificar No-Reciprocal Follows
```
Filtro Rápido → "No siguen de vuelta" → Exporta datos
```
Ve quién no te sigue de vuelta y decida si continuar siguiéndolos.

### 3. Análisis de Audience
```
Filtros Personalizados → Rango: 10K-100K seguidores → Exporta
```
Analiza principales influenciadores en tu lista para colaboraciones.

### 4. Audit de Crecimiento
```
Exporta datos actuales → Espera 1 mes → Importa datos nuevos → Compara
```
Rastrea cambios en tus seguidores durante el tiempo.

## ⚙️ Configuración Avanzada

En la pestaña **"Configuración"** hay opciones para:

- **Velocidad de Escaneo**: Ajusta delay entre requests (default: 500ms)
- **Reintentos**: Número máximo de intentos fallidos (default: 3)

⚠️ **Nota**: Instagram puede bloquear si vas muy rápido. Recomendado dejar defaults.

## 🔒 Privacidad y Seguridad

✅ **100% LOCAL**: Todo ocurre en tu navegador
- ❌ No enviamos datos a servidores externos
- ❌ No almacenamos información tuya
- ✅ LocalStorage solo para sesión actual (se borra al limpiar caché)
- ✅ Código abierto - verifica el código fuente

## ⚠️ Disclaimer Legal

- **No afiliado con Instagram/Meta**: Esta es una herramienta de terceros
- **Uso bajo tu propio riesgo**: Sigue términos de servicio de Instagram
- **Verificación Manual Recomendada**: Verifica siempre antes de unfollows masivos
- **Respeta Rate Limits**: No hagas mil unfollows en 1 segundo = ban

**TL;DR**: Úsalo responsablemente. Instagram puede suspender tu cuenta si abusas.

## 🛠️ Desarrollo

### Estructura del Proyecto

```
InstagramFilters/
├── src/
│   ├── main.ts                 # App principal y UI
│   ├── instagram-scraper.ts    # Extrae datos de Instagram
│   ├── filter-engine.ts        # Motor de filtros
│   └── types.ts                # TypeScript interfaces
├── dist/
│   ├── bookmarklet.js          # Compilado minificado
│   ├── bookmarklet-url.txt     # Versión para bookmark
│   ├── console-paste.js        # Versión para consola
│   └── index.html              # Página de instalación
├── scripts/
│   └── generate-bookmarklet.js # Script para generar bookmarklet
├── package.json                # Dependencias
└── tsconfig.json               # Configuración TypeScript
```

### Comandos de Desarrollo

```bash
# Install dependencies
npm install

# Development mode con hot reload
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

### Agregar Nuevas Características

1. **Tipos**: Agrega interfaces en `src/types.ts`
2. **Lógica**: Nuevos módulos en `src/`
3. **UI**: Actualiza strings HTML en `src/main.ts`
4. **Estilos**: Modifica CSS en función `injectStyles()`
5. **Tests**: Crea test files (próximamente)

## 📊 API Reference

### FilterEngine

```typescript
// Aplicar filtros a lista de usuarios
FilterEngine.applyFilters(users: IGUser[], criteria: FilterCriteria): IGUser[]

// Obtener estadísticas
FilterEngine.getStats(users: IGUser[]): Stats

// Obtener filtros preconfigurados
FilterEngine.getPreset(type: 'not-following-back' | 'ghost-followers' | ...): FilterCriteria
```

### InstagramScraper

```typescript
// Obtener lista de following
InstagramScraper.getFollowingList(): Promise<IGUser[]>

// Obtener lista de followers
InstagramScraper.getFollowersList(): Promise<IGUser[]>

// Obtener detalles de usuario específico
InstagramScraper.getUserDetails(username: string): Promise<IGUser | null>
```

## 🐛 Solución de Problemas

### "No funciona después de pegar el código"
- Asegúrate de estar en **instagram.com** (no en apps móvil)
- Verifica que abiste DevTools en la pestaña **Console**
- Intenta actualizar la página e intenta de nuevo

### "El botón Scan no responde"
- Instagram puede estar bloqueando el script
- Espera unos minutos y intenta de nuevo
- Verifica en DevTools si hay errores (F12 → Console)

### "No veo mis followers"
- Algunos navegadores tienen restricciones CORS
- Intenta en Chromium/Chrome en lugar de Firefox
- Asegúrate de que Instagram haya cargado completamente

### "¿Puedo unfollower a 1000 personas a la vez?"
- ❌ No (riesgo de ban)
- Recomendado: Máximo 50-100 por sesión
- Espera entre sesiones (8+ horas)

## 🤝 Contribuciones

¿Quieres mejorar esto?

1. Fork el repo
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Áreas para mejorar:
- [ ] Soporte para más metadata de usuarios (engagement, hashtags...)
- [ ] Análisis comparativo entre snapshots
- [ ] Integración con APIs de análisis
- [ ] Soporte para perfiles de negocio
- [ ] Mejor manejo de rate limiting
- [ ] Tests unitarios

## 📄 Licencia

MIT © 2024 - Libre para usar, modificar y distribuir

## 🙏 Créditos

Inspirado en [InstagramUnfollowers](https://github.com/davidarroyo1234/InstagramUnfollowers) pero con filtros avanzados y mejor UX.

## 📞 Soporte

¿Problemas o sugerencias?

- 🐛 **Reporta bugs**: Crea un issue en GitHub
- 💡 **Sugerencias**: Discussions o Issues
- ❓ **Preguntas**: FAQ en README o Discussions

---

**Último actualizado**: Abril 2024
**Versión Estable**: 1.0.0
**Soporte**: TypeScript + Vanilla JS

Made with ❤️ by developers para developers
