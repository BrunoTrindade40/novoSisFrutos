// obfuscate-frontend.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JavaScriptObfuscator from 'javascript-obfuscator';

// Simular __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distAssetsPath = path.join(__dirname, 'dist', 'assets');

function obfuscateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: true,
    debugProtection: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 0.75,
  }).getObfuscatedCode();

  fs.writeFileSync(filePath, obfuscatedCode, 'utf8');
  console.log(`✅ Ofuscado: ${path.basename(filePath)}`);
}

function obfuscateJSFilesInDist() {
  if (!fs.existsSync(distAssetsPath)) {
    console.error('❌ Diretório dist/assets não encontrado. Rode "vite build" antes.');
    process.exit(1);
  }

  const files = fs.readdirSync(distAssetsPath);
  const jsFiles = files.filter((file) => file.endsWith('.js'));

  if (jsFiles.length === 0) {
    console.warn('⚠️ Nenhum arquivo JS encontrado em dist/assets.');
    return;
  }

  console.log(`🔐 Iniciando ofuscação (${jsFiles.length} arquivos)...`);
  jsFiles.forEach((file) => obfuscateFile(path.join(distAssetsPath, file)));
  console.log('🎉 Ofuscação concluída.');
}

obfuscateJSFilesInDist();
