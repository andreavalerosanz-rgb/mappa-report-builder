/* eslint-disable */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream');

const app = express();

// Middleware esencial
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Endpoint 1: Procesar CSV (Acepta /api/upload o /upload)
app.post(['/api/upload', '/upload'], upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  const results = [];
  const stream = Readable.from(req.file.buffer);

  stream
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results))
    .on('error', (error) => res.status(500).json({ error: error.message }));
});

// Endpoint 2: IA Copilot (Acepta /api/copilot o /copilot)
app.post(['/api/copilot', '/copilot'], async (req, res) => {
  const { prompt, config, data } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Falta el prompt' });

  try {
    const aiResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `Analiza esto y devuelve un JSON válido con primaryColor, template o aiSummary.\nPrompt: "${prompt}"`,
        stream: false
      })
    });
    const aiData = await aiResponse.json();
    const jsonString = aiData.response.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(jsonString));
  } catch (error) {
    console.warn("⚠️ Usando fallback de IA.");
    setTimeout(() => res.json({ aiSummary: "Datos procesados y optimizados para el reporte de sostenibilidad de la planta." }), 1000);
  }
});

// Arranque local (Vercel ignora esto)
if (process.env.NODE_ENV !== 'production') {
  app.listen(3001, () => {
    console.log('✅ API local corriendo en http://localhost:3001');
  });
}

// Exportación para Vercel
module.exports = app;