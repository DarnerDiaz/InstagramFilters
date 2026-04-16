# 🚀 Quick Start Guide

## 5 minutos para empezar

### Para usuarios (SIN instalar nada)

```
1. Abre Instagram en navegador
2. Presiona Ctrl+Shift+J (o Cmd+Option+J en Mac)
3. Copia y pega este código en la consola:

(async function(){const s=document.createElement('script');s.src='https://raw.githubusercontent.com/yourusername/InstagramFilters/main/dist/bookmarklet.js';s.onload=function(){new InstagramFilterApp().init()};document.head.appendChild(s)})();

4. ¡Presiona Enter!
5. Aparecerá la interfaz en la esquina superior derecha
```

**Video tutorial**: [Ver en YouTube](https://youtube.com/placeholder)

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
