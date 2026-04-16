#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Read the compiled bookmarklet code
const distPath = path.join(__dirname, '..', 'dist', 'bookmarklet.js');
let code = fs.readFileSync(distPath, 'utf-8');

// Create a bookmarklet that can be used in browser
const bookmarklet = `javascript:(function(){
${code}
})();`;

// Also create a version that can be pasted into console
const consoleVersion = code;

// Create bookmarklet file
fs.writeFileSync(
  path.join(__dirname, '..', 'dist', 'bookmarklet-url.txt'),
  bookmarklet
);

// Create console version
fs.writeFileSync(
  path.join(__dirname, '..', 'dist', 'console-paste.js'),
  consoleVersion
);

// Create easy-to-copy bookmarklet snippet
const bookmarkletHTML = `
<html>
<head>
  <title>Instagram Filters - Bookmarklet</title>
  <style>
    body { font-family: system-ui; padding: 20px; max-width: 800px; margin: 0 auto; }
    .instructions { background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .code { background: #222; color: #0f0; padding: 15px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 12px; }
    button { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; }
  </style>
</head>
<body>
  <h1>📸 Instagram Filters - Bookmarklet</h1>

  <h2>Opción 1: Pegar en Consola (Recomendado)</h2>
  <div class="instructions">
    <ol>
      <li>Abre Instagram web en tu navegador</li>
      <li>Abre DevTools: <code>Ctrl+Shift+J</code> (Windows) o <code>Cmd+Option+J</code> (Mac)</li>
      <li>Copia el código de abajo</li>
      <li>Pégalo en la consola y presiona Enter</li>
      <li>¡Listo! La interfaz aparecerá</li>
    </ol>
  </div>

  <button onclick="copyCode()">📋 Copiar Código</button>
  <div id="code-container" class="code" style="margin: 20px 0; display:none;"></div>

  <h2>Opción 2: Crear Bookmarklet</h2>
  <div class="instructions">
    <ol>
      <li>Haz clic derecho en la barra de marcadores de tu navegador</li>
      <li>Selecciona "Agregar página"</li>
      <li>
        Nombre: <code>Instagram Filters</code>
      </li>
      <li>URL: <code>${bookmarklet.substring(0, 100)}...</code></li>
      <li>Guarda el bookmark</li>
      <li>Cuando quieras usar, simplemente haz clic en el bookmark en Instagram</li>
    </ol>
  </div>

  <script>
    const code = \`${consoleVersion.replace(/\\/g, '\\\\')}  \`;
    
    function copyCode() {
      const container = document.getElementById('code-container');
      container.textContent = code;
      container.style.display = 'block';
      
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(container);
      selection.removeAllRanges();
      selection.addRange(range);
      
      try {
        document.execCommand('copy');
        alert('✅ Código copiado al portapapeles!');
      } catch (err) {
        alert('❌ Error al copiar. Copia manualmente del recuadro que apareció.');
      }
      
      selection.removeAllRanges();
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'dist', 'index.html'),
  bookmarkletHTML
);

console.log('✅ Bookmarklet generado exitosamente!');
console.log('Archivos creados:');
console.log('  - dist/bookmarklet.js (código compilado)');
console.log('  - dist/bookmarklet-url.txt (versión bookmarklet)');
console.log('  - dist/console-paste.js (para pegar en consola)');
console.log('  - dist/index.html (interfaz para copiar)');
