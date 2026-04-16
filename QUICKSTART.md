# 🚀 Quick Start Guide - 5 Minutos para Empezar

## Para Usuarios (SIN instalar nada)

### OPCIÓN 1️⃣: Pegar Código Directamente en Consola (RECOMENDADO - 30 segundos)

```
1. ✅ Abre Instagram en navegador
2. ✅ Presiona Ctrl+Shift+J (o Cmd+Option+J en Mac)
3. ✅ Copia el código de abajo
4. ✅ Pégalo en la consola
5. ✅ Presiona Enter
6. ✅ ¡Aparecerá la interfaz!
```

**¿Por qué así?** Instagram bloquea scripts desde URLs externas por seguridad. 
Pegando en la consola se ejecuta con permisos de la página.

### ¿DÓNDE CONSIGO EL CÓDIGO?

**Opción A: Desde GitHub**
```
1. Ve a: https://github.com/DarnerDiaz/InstagramFilters
2. Carpeta: dist/
3. Archivo: console-paste.js
4. Cópialo, pégalo en consola, listo!
```

**Opción B: Construir Localmente**
```bash
git clone https://github.com/DarnerDiaz/InstagramFilters.git
cd InstagramFilters
npm install
npm run build
# El código compilado estará en dist/console-paste.js
```

### OPCIÓN 2️⃣: Crear un Bookmark (Recómendado si lo usarás muchas veces)

1. Copia el código de `dist/console-paste.js`
2. Haz clic derecho en barra de marcadores
3. "Agregar página"
4. **Nombre**: `Instagram Filters`
5. **URL**: `javascript:(function(){` + EL_CODIGO_DE_ARRIBA + `})();`
6. ¡Listo! Ahora en Instagram solo haz clic en el bookmark

### Para developers (Compila tu propia versión)

```bash
# 1. Clonar
git clone https://github.com/yourusername/InstagramFilters.git
cd InstagramFilters

# 2. Instalar
npm install

# 3. Compilar
npm run build

# 4. Resultado en dist/bookmarklet.js
```

## Primeros Pasos en la App

### Flujo Rápido (2 minutos)

1. **Escanear**:
   - Pestaña "Scanner"
   - Haz clic en "Filtro Rápido" → "No siguen de vuelta"
   - Espera a que termine

2. **Seleccionar**:
   - Pestaña "Resultados"
   - Haz clic en "Seleccionar Todo"

3. **Desafollower**:
   - Botón rojo "❌ Unfellow Seleccionados"
   - Confirma cuando pida

4. **Exporta** (opcional):
   - Pestaña "Configuración"
   - "💾 Exportar Datos"

## Troubleshooting Básico

| Problema | Solución |
|----------|----------|
| "No funciona el código" | Asegúrate de estar en instagram.com (no app móvil) |
| "Script error" | Actualiza la página y intenta de nuevo |
| "Aparece en blanco" | Abre DevTools (F12) y busca errores en Console |
| "Muy lento" | Reduce la cantidad de usuarios a escanear |

## Próximos Pasos

- 📖 Lee el [README.md](./README.md) completo para features avanzadas
- ⚙️ Ajusta opciones en pestaña "Configuración"
- 💡 Explora los filtros personalizados para casos específicos
- 🤝 Contribuye! Mira [CONTRIBUTING.md](./CONTRIBUTING.md)

## Links Importantes

- 📚 [Documentación Completa](README.md)
- 🐛 [Reportar Bugs](https://github.com/yourusername/InstagramFilters/issues)
- 💬 [Discusiones](https://github.com/yourusername/InstagramFilters/discussions)
- 📋 [Changelog](CHANGELOG.md)

---

**¿Necesitas ayuda?** Abre un issue en GitHub.
