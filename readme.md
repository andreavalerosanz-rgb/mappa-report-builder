# Mappa Report Builder 🌍

A web application that generates branded, AI-enhanced Product Carbon Footprint (PCF) reports from CSV data, built for the Mappa Technical Challenge.

## 1. Chosen Path: A Blend of Path B & Path C
I chose to blend **Path B (Customizable)** and **Path C (AI-native)**. 
After analyzing the provided Relats sample report, I realized that a pure data-dump table wouldn't deliver enough business value. A real ESG report needs a narrative structure: an executive summary, a methodological approach, and strategic recommendations. 

Therefore, I built a highly customizable UI (Path B) that allows users to upload their logo, select brand colors, and choose layout templates. Simultaneously, I integrated a local LLM via Ollama (Path C) to analyze the uploaded emissions data and generate the "Strategic Recommendations" section. This approach bridges the gap between raw data and a consultant-grade deliverable.

## 2. Time Invested
I invested approximately **15 - 20 hours** over the week. The time was roughly distributed as follows:
* **Scope & Product Design:** 2 hours (Analyzing the Relats sample, defining the architecture).
* **Frontend & Web Preview:** 7 hours (Building the configurator, state management, and the React UI).
* **PDF Engine (`@react-pdf/renderer`):** 6 hours (Translating web CSS into PDF-compatible primitives and ensuring a 1:1 match between the web preview and the downloaded document).
* **Backend & AI Integration:** 2-3 hours (Express server setup, CSV parsing, and local Ollama Llama 3 integration).
* **Deployment & Polish:** 2-4 hours (Vercel monorepo configuration and debugging).

## 3. How I Used AI
I heavily embraced an AI-assisted workflow to accelerate development and overcome framework-specific bottlenecks.
* **What I delegated (Copilot / LLMs):** Boilerplate generation (Vite, Tailwind, Express setup), regex for data formatting, Vercel deployment troubleshooting, and the tedious translation of standard CSS into the strict subset required by `@react-pdf/renderer`.
* **What I owned (Human):** Product strategy, architectural decisions (isolating the web preview from the PDF engine while sharing styles), UI/UX design decisions to match the Relats brand, and the prompt engineering strategy for the local AI.
* **Tools used:** VS Code with Copilot, Gemini (for deep-dive debugging on Vercel and React-PDF quirks), and Ollama (running Llama 3 locally for the actual app feature to ensure data privacy).

## 4. What I'd Do With More Time
If I had another week, I would focus on:
1.  **Data Visualization:** Integrate `recharts` for the web preview and `react-pdf-charts` to generate dynamic pie/bar charts of Scope 1/2/3 emissions, matching the visual richness of the sample doc.
2.  **Backend Persistence:** Move from a stateless app to a full database (e.g., PostgreSQL via Supabase) to save report configurations and historical CSV uploads.
3.  **Advanced RAG:** Improve the AI Copilot by using a Retrieval-Augmented Generation (RAG) approach, feeding the LLM actual ISO 14067 guidelines to generate more technical and regulatory-compliant recommendations.

## Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS.
* **PDF Generation:** `@react-pdf/renderer`.
* **Backend:** Node.js, Express, Multer.
* **AI:** Local Ollama (Llama 3).
* **Deployment:** Vercel.