# 🆘 Guía de Solución de Problemas en Español

## Problemas Comunes y Soluciones Rápidas

### 1. "El código no funciona después de pegarlo"

**Síntomas**: Pego el código, pero no pasa nada o aparece error rojo

**Soluciones**:
```
✓ Paso 1: Verifica estar en instagram.com (la versión web, NO la app)
✓ Paso 2: Recarga la página (Ctrl+R)
✓ Paso 3: Abre DevTools de nuevo (Ctrl+Shift+J)
✓ Paso 4: Pega el código pero esta vez sin caracteres extras
✓ Paso 5: Presiona Enter

Si sigue sin funcionar:
→ Intenta en otro navegador (Chrome si usabas Firefox)
→ Limpia el caché del navegador (Ctrl+Shift+Supr)
→ Desactiva extensiones que bloqueen scripts
```

---

### 2. "No aparece la interfaz/panel"

**Síntomas**: El código se ejecuta pero no veo nada en pantalla

**Soluciones**:
```
a) Puede estar fuera de vista:
   → Mira la esquina superior DERECHA
   → Desplázate hacia arriba si está cortada
   → Intenta maximizar ventana

b) Puede que Instagram haya bloqueado el script:
   → Abre DevTools (F12)
   → Ve a "Console"
   → Busca un mensaje de error rojo
   → Copia el error y busca en GitHub Issues

c) Es posible que haya colisión con otra extensión:
   → Desactiva todas las extensiones
   → Intenta de nuevo
   → Si funciona, reactiva extensiones una a una
   → Identifica cuál causa el problema
```

---

### 3. "Error al escanear - no carga followers"

**Síntomas**: Presiono botón de escaneo pero se queda en 0%

**Soluciones**:
```
Causa más probable: Instagram bloqueó el acceso

Soluciones:
1. Espera 30 minutos y vuelve a intentar
2. Intenta con "Escanear Following" en lugar de "Followers"
3. Abre tu perfil de Instagram primero, LUEGO abre la herramienta
4. Intenta con menos seguidores abiertos en pantalla (cierra popups)

Si persiste:
→ Muy rápido: Baja la cantidad en "Configuración" → Velocidad
→ Muchos seguidores: Filtra por rango pequeño de seguidores
→ Instagram enfadado: Espera 24 horas y vuelve a intentar
```

---

### 4. "El botón Unfollow no funciona / hace nada"

**Síntomas**: Selecciono usuarios, presiono Unfollow pero no se desigue a nadie

**Soluciones**:
```
Estado actual: Esta función aún está en desarrollo

En v1.0.0, es simulada. Para desiguir REALMENTE debes:

Opción A: Manualmente
1. Selecciona usuarios de la lista
2. Abre sus perfiles en nuevas pestañas
3. Presiona "Following" → "Unfollow" en cada perfil
(La herramienta identifica a quiénes dejar de seguir, tú haces click)

Opción B: Espera automatización completa (v1.1)
→ En breve habrá integración con API
→ Seguiremos en GitHub para actualizaciones

Por ahora: La herramienta es excelente para IDENTIFICAR,
debes EJECUTAR unfollows manualmente por seguridad
```

---

### 5. "Exportar data no funciona"

**Síntomas**: Presiono "Exportar" pero no se descarga nada

**Soluciones**:
```
1. Comprueba que descargaste algo en tu carpeta Descargas
   → Si está ahí, ¡funcionó! Busca archivo con nombre como:
      instagram-filter-1712123456.json

2. Si no descargó:
   → Verifica que el navegador permite descargas automáticas
   → Intenta en pestaña incógnito
   → Comprueba permisos de carpeta Descargas

3. Si sigue sin funcionar:
   → Revisa la consola (F12 → Console) para mensajes de error
   → Copia el error y busca en Issues de GitHub

4. Workaround temporal:
   → Abre F12 → Console
   → Escribe: copy(JSON.stringify(appState.scannedUsers))
   → Pega en editor de texto
   → Guarda como .json
```

---

### 6. "Los filtros no funcionan / no filtran nada"

**Síntomas**: Aplico filtros pero me muestra todos los usuarios igual

**Soluciones**:
```
Paso 1: Verifica que PRIMERO escaneaste usuarios
→ Si no viste resultados iniciales, no hay qué filtrar

Paso 2: Comprueba el filtro:
→ ¿Min de seguidores está muy alto? Baja a 0
→ ¿Max de seguidores está muy bajo? Sube a 10000000
→ ¿Tienes múltiples filtros activados? Algunos pueden ser contradictorios

Paso 3: Usa filtros rápidos (más fácil):
→ Vuelve a Filtros
→ Presiona botones preconfigurados como "No siguen de vuelta"
→ Si esos tampoco funcionan, hay bug

Paso 4: Si sospechas bug:
→ Abre consola (F12)
→ Busca errores
→ Reporta en GitHub con screenshot
```

---

### 7. "Aparece vacío / solo dice 'Escanea usuarios'"

**Síntomas**: La interfaz está ahí pero los resultados están vacíos

**Soluciones**:
```
1. ¿Has escaneado aún?
   → Ve a pestaña "Scanner"
   → Presiona "Escanear Following" o "Escanear Followers"
   → Espera a que termine
   → Luego ve a "Resultados"

2. ¿El escaneo finalizó pero mostró 0?
   → Es raro. Intenta de nuevo
   → Asegúrate de que Instagram cargó completo
   → Intenta en otro navegador

3. ¿Scaneaste con muchos filtros activados?
   → Quizá simplemente no hay coincidencias
   → Abre pestaña "Filtros"
   → Presiona "Deseleccionar Todo"
   → Vuelve a "Resultados" 
   → Verifica si aparecen usuarios sin filtros

4. ¿Acabas de importar datos?
   → Actualiza página (Ctrl+R)
   → Abre la herramienta de nuevo
   → Los datos importados deberían estar
```

---

### 8. "Instagram me muestra 'Necesitas esperar' o 'Too many requests'"

**Síntomas**: Instagram intenta bloquearte o te pide esperar

**Soluciones**:
```
Esto significa: Instagram detectó actividad automatizada

ACCIONES INMEDIATAS:
1. PARA completamente - deja de usar la herramienta
2. ESPERA 24-48 horas antes de intentar de nuevo
3. USA Instagram normalmente (scroll, comentarios, likes manuales)
4. DESPUÉS de esperar, intenta con límites más bajos

PARA PRÓXIMAS VECES:
→ Reduce agresividad: Máximo 50 unfollows por sesión
→ Aumenta espacios: Espera 12 horas entre sesiones
→ Varía actividad: Haz otras cosas en Instagram entre unfollows
→ Monitorea: Si ves warning ligero, para inmediatamente
```

---

### 9. "¿Es seguro? ¿Puedo perder mi cuenta?"

**Síntomas**: Miedo/paranoia sobre usar la herramienta

**Respuesta**:
```
Riesgo realista: BAJO si la usas responsablemente

Qué pasaría en peor caso:
→ Advertencia temporal (1-7 días)
→ Suspensión temporal de acciones como unfollow
→ En rarísimos casos: Suspensión 30 días de cuenta
→ Riesgo de ban permanente: BAJO si no abusas

Cómo minimizar riesgo:
→ NO hagas 1000 unfollows en 1 hora ❌
→ SÍ haz 50-100 spaceados cada 12+ horas ✓
→ NO hagas esto 24/7 durante semanas ❌
→ SÍ úsalo ocasionalmente cuando necesites limpiar ✓
→ NO mezcles con otros bots ❌
→ SÍ úsalo desde navegador desktop solo ✓

Ver: SECURITY.md para información completa
```

---

### 10. "Cómo reportar un bug / dar feedback"

**Si encontraste un problema**:
```
1. Abre GitHub:
   https://github.com/yourusername/InstagramFilters/issues

2. Presiona "New Issue"

3. Completa con:
   ✓ Título claro: "Filtro no funciona en Chrome"
   ✓ Descripción: Qué intentaste, qué pasó
   ✓ Pasos: 1. Escaneo, 2. Aplico filtro, 3. Nada pasa
   ✓ Sistema: Windows 10, Chrome 120, Instagram 2024
   ✓ Screenshot: Si es posible, incluye imagen
   ✓ Console logs: Abre F12, copia errores

4. Presiona "Submit new issue"

5. El equipo responderá en 2-7 días
```

---

## Errores Técnicos Específicos

### Error: "Uncaught TypeError: Cannot read property..."
```
Significa: Script intentó acceder a algo que no existe

Solución:
→ Recarga página (Ctrl+R)
→ Intenta de nuevo
Si repite:
→ Reporta en GitHub con el mensaje completo del error
```

### Error: "CORS policy..."
```
Significa: Navegador bloqueó por seguridad

Solución:
→ Usa Chrome en lugar de Firefox temporalmente
→ Aunque es raro, algunos navegadores son más restrictivos
```

### Error: "ReferenceError: InstagramFilterApp is not defined"
```
Significa: El script no se cargó completamente

Solución:
→ Espera 3-5 segundos después de pegar código
→ Vuelve a intentar
→ Si persiste, recarga página e intenta desde cero
```

---

## Checklist de Solución de Problemas

Usa esto para self-serve:

```
[ ] ¿Estoy en instagram.com? (no app, no dm.instagram)
[ ] ¿Tengo DevTools abierto? (F12)
[ ] ¿Estoy en la pestaña Console? (no Elements)
[ ] ¿Pegué el código COMPLETO? (sin editar)
[ ] ¿Presioné Enter después de pegar?
[ ] ¿Esperé 2-3 segundos para que cargue?
[ ] ¿Recé a los dioses del código? (no obligatorio pero ayuda)
[ ] ¿Busqué en Issues similares? (antes de crear nuevo)
[ ] ¿Incluí screenshot del error?
[ ] ¿Probé en otro navegador?
[ ] ¿Probé en pestaña incógnito?
[ ] ¿Limpié caché? (Ctrl+Shift+Supr)
[ ] ¿Desactivé extensiones temporalmente?
[ ] ¿Reporté el issue en GitHub?
```

Si pasaste todos estos pasos y sigue sin funcionar:
→ Abre un Issue detallado en GitHub
→ El equipo ayudará a resolver

---

## Contacto y Soporte

- 📖 Documentación: [README.md](README.md)
- 🔒 Seguridad: [SECURITY.md](SECURITY.md)
- ❓ FAQ: Ver "Discussions" en GitHub
- 🐛 Bugs: [Issues](https://github.com/yourusername/InstagramFilters/issues)
- 💬 Chats: [Discussions](https://github.com/yourusername/InstagramFilters/discussions)

**Recuerda**: La mayoría de problemas se resuelven:
1. Recargar página
2. Limpiar caché
3. Usar Chrome en lugar de Firefox
4. Intentar en incógnito

¡Si todo falla, reporta un issue - la comunidad te ayudará! 🤝
