/* eslint-disable */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const { Readable } = require('stream');

const app = express();

app.use(cors());

// Increase the JSON body limit to 10mb to handle larger payloads.
// The default (100kb) is too small once CSV data gets non-trivial.
// Note: config.logo (base64 image) is stripped client-side before sending,
// but we still bump this limit as a safety net.
app.use(express.json({ limit: '10mb' }));

const upload = multer({ storage: multer.memoryStorage() }); //de esta manera el archivo se guarda en memoria y no en disco

// ── Endpoint 1: CSV upload ────────────────────────────────────────────────────
app.post(['/api/upload', '/upload'], upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  const results = [];
  const stream = Readable.from(req.file.buffer);

  stream // este stream es un buffer que contiene el archivo CSV subido
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results))
    .on('error', (error) => res.status(500).json({ error: error.message }));
});

// ── Endpoint 2: AI Copilot ────────────────────────────────────────────────────
app.post(['/api/copilot', '/copilot'], async (req, res) => {
  const { prompt, config, data } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Falta el prompt' });

  const headers = data?.length ? Object.keys(data[0]) : [];
  const sampleRows = (data || []).slice(0, 5); // first 5 rows as context
  const dataContext = JSON.stringify({ headers, sampleRows }); // Provide a concise context of the data to the AI

  // Strip logo from config — it's a base64 string and irrelevant for the AI
  const { logo: _logo, ...configWithoutLogo } = config || {};

  const systemPrompt = `You are a report design assistant. Return ONLY a valid JSON object, no markdown, no explanation.
Allowed keys:
  - "primaryColor" (hex string, e.g. "#ff7983")
  - "template" ("standard" | "minimal" | "modern")
  - "title" (string)
  - "company" (string)
  - "aiSummary" (string — a 4-5 sentence executive summary based on the data)
Only include keys the user's instruction actually warrants changing.

Current config: ${JSON.stringify(configWithoutLogo)}
Data context: ${dataContext}
User instruction: "${prompt}"`;

try {
    const aiResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: systemPrompt,
        stream: false,
        format: 'json',
      }),
    });

    if (!aiResponse.ok) throw new Error(`Ollama HTTP ${aiResponse.status}`);

    const aiData = await aiResponse.json();
    const raw = aiData.response || '';
    

    const parsed = JSON.parse(raw);
    return res.json(parsed);

  } catch (error) {

    console.error('⚠️ Error crítico con Ollama:', error.message);
    
    return res.json({
      aiSummary: 'Datos procesados y optimizados para el reporte de sostenibilidad.',
    });
  }
});

// ── Local dev server ──────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.listen(3001, () => {
    console.log('✅ API local corriendo en http://localhost:3001');
  });
}

module.exports = app;