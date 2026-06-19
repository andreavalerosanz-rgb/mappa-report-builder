const express = require('express');
const multer = require('multer');
const cors = require('cors');
const csv = require('csv-parser');
const stream = require('stream');

const app = express();
// Usamos multer para guardar el archivo en memoria temporalmente
const upload = multer({ storage: multer.memoryStorage() }); 

app.use(cors());
app.use(express.json());

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

  const results = [];
  // Convertimos el buffer del archivo a un stream para que csv-parser lo pueda leer
  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);

  bufferStream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Error al procesar el CSV' });
    });
});
app.post('/api/copilot', async (req, res) => {
  const { prompt, config, data } = req.body;

  if (!prompt) return res.status(400).json({ error: 'Falta el prompt' });

  // Preparamos el contexto para el LLM
  const systemPrompt = `Eres un asistente experto en sostenibilidad. El usuario te pedirá cambios sobre un reporte de emisiones.
Tu objetivo es analizar su petición y devolver ÚNICAMENTE un objeto JSON válido con los cambios de configuración y/o un resumen redactado de los datos.
Config actual: ${JSON.stringify(config)}
Muestra de datos (primeros 3 registros): ${JSON.stringify(data.slice(0, 3))}

Petición del usuario: "${prompt}"

Si el usuario pide un color, devuelve el HEX en 'primaryColor'.
Si pide un diseño limpio, devuelve 'minimal' en 'template'. Si pide bloques de color, devuelve 'modern'.
Si pide un resumen, redacta un párrafo profesional en 'aiSummary' basado en los datos,.
Responde SOLO con el JSON, sin texto adicional. Formato esperado:
{ "primaryColor": "#...", "template": "...", "aiSummary": "..." }`;

  try {
    // Intentamos conectar con una IA local (ej: Ollama con Llama3)
    const aiResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3', // Puedes cambiarlo por el modelo que tengas bajado
        prompt: systemPrompt,
        stream: false
      })
    });

    const aiData = await aiResponse.json();
    
    // Limpiamos la respuesta por si el LLM metió markdown
    const jsonString = aiData.response.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedConfig = JSON.parse(jsonString);

    res.json(parsedConfig);

  } catch (error) {
    console.warn("⚠️ No se detectó LLM local. Usando fallback de demostración.");
    
    // FALLBACK DE DEMO (Para que la app funcione aunque apagues Ollama)
    const fallbackResponse = {};
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('verde') || promptLower.includes('green')) fallbackResponse.primaryColor = '#16a34a';
    if (promptLower.includes('rojo') || promptLower.includes('red')) fallbackResponse.primaryColor = '#dc2626';
    if (promptLower.includes('minimal')) fallbackResponse.template = 'minimal';
    if (promptLower.includes('modern')) fallbackResponse.template = 'modern';
    if (promptLower.includes('resumen') || promptLower.includes('summary')) {
      const totalRegistros = data.length;
      fallbackResponse.aiSummary = `Resumen Ejecutivo Generado: Se han analizado un total de ${totalRegistros} entidades/productos. Las emisiones principales muestran una distribución clara a lo largo de la cadena de valor. Este reporte consolida las métricas clave para facilitar la toma de decisiones estratégicas.`;
    }

    // Simulamos un pequeño retraso de "pensamiento"
    setTimeout(() => {
      res.json(fallbackResponse);
    }, 1500);
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en el puerto ${PORT}`);
});