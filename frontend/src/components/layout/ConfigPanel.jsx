import { useState } from 'react';

// ─── Brand gradient as a reusable CSS value ───────────────────────────────────
const MAPPA_GRADIENT = 'linear-gradient(90deg, #fdc2d8 0%, #fca65e 33%, #ff7983 66%, #041282 100%)';

// gradient used as a divider 
const GradientRule = ({ className = '' }) => (
  <div
    className={`h-px w-full ${className}`}
    style={{ background: MAPPA_GRADIENT }}
  />
);

// Section heading — small caps, black, understated
const SectionHeading = ({ number, label }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-[10px] font-bold text-black/25 tabular-nums">{number}</span>
    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/40">{label}</span>
    <div className="flex-1 h-px bg-black/8" />
  </div>
);

// Shared input style
const inputClass =
  'w-full bg-transparent border border-black/12 rounded px-3 py-2 text-sm text-black placeholder-black/25 outline-none focus:border-black/40 transition-colors';

export const ConfiguratorPanel = ({
  config,
  onConfigChange,
  onFileUpload,
  onLogoUpload,
  loading,
  recordCount,
  onReset,
  onAiSubmit,
  isAiLoading,
}) => {
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAiSubmit = (e) => {
    e.preventDefault();
    onAiSubmit(aiPrompt);
    setAiPrompt('');
  };

  const templates = [
    { value: 'standard', label: 'Estándar' },
    { value: 'minimal', label: 'Minimal' },
    { value: 'modern', label: 'Modern' },
  ];

  return (
    <aside className="w-[300px] min-w-[300px] h-full bg-white border-r border-black/10 flex flex-col overflow-hidden">

      {/* ── Logo / Wordmark ────────────────────────────────────────────── */}
      <div className="px-7 pt-6 pb-5">
        <div className="flex items-baseline gap-1.5">
          {/* Gradient wordmark */}
          <span
            className="text-xl font-black tracking-tight leading-none"
            style={{
              background: MAPPA_GRADIENT,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MAPPA
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/30 leading-none mb-0.5">
            Report Builder
          </span>
        </div>
      </div>

      <GradientRule />

      {/* ── Scrollable body ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-7 py-6 space-y-8">

        {/* 1 · DATA SOURCE */}
        <section>
          <SectionHeading number="01" label="Fuente de datos" />

          <label className="block cursor-pointer group">
            <div className="border border-dashed border-black/20 rounded p-4 text-center transition-colors group-hover:border-black/50 group-hover:bg-black/[0.02]">
              <svg
                className="w-5 h-5 mx-auto mb-2 text-black/25 group-hover:text-black/50 transition-colors"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-xs text-black/40">
                <span className="font-bold text-black/70">Sube un CSV</span> o arrástralo aquí
              </p>
            </div>
            <input type="file" accept=".csv" className="hidden" onChange={onFileUpload} />
          </label>

          {loading && (
            <p className="mt-3 text-xs text-black/40 text-center">Procesando…</p>
          )}

          {recordCount > 0 && !loading && (
            <div className="mt-3 flex items-center gap-2">
              {/* Tiny gradient pill indicator */}
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff7983' }} />
              <span className="text-xs font-bold text-black/60">
                {recordCount} registros cargados
              </span>
            </div>
          )}
        </section>

        {/* 2 · IDENTITY */}
        <section>
          <SectionHeading number="02" label="Identidad" />

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black/30 mb-1.5">
                Título
              </label>
              <input
                type="text"
                name="title"
                value={config.title}
                onChange={onConfigChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black/30 mb-1.5">
                Empresa
              </label>
              <input
                type="text"
                name="company"
                value={config.company}
                onChange={onConfigChange}
                className={inputClass}
              />
            </div>

            {/* Color — strip + picker */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black/30 mb-1.5">
                Color principal
              </label>
              <div className="flex items-center gap-2 border border-black/12 rounded px-3 py-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={config.primaryColor}
                  onChange={onConfigChange}
                  className="h-5 w-5 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <span className="text-xs font-mono text-black/50">{config.primaryColor}</span>

                {/* Brand color quick-picks */}
                <div className="ml-auto flex gap-1.5">
                  {['#041282', '#ff7983', '#fca65e', '#fdc2d8'].map(hex => (
                    <button
                      key={hex}
                      title={hex}
                      onClick={() => onConfigChange({ target: { name: 'primaryColor', value: hex, type: 'text' } })}
                      className="w-4 h-4 rounded-full border border-black/10 transition-transform hover:scale-110"
                      style={{ background: hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Logo upload */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black/30 mb-1.5">
                Logo corporativo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onLogoUpload}
                className="w-full text-xs text-black/40
                  file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0
                  file:text-[11px] file:font-bold file:uppercase file:tracking-wider
                  file:bg-black file:text-white hover:file:bg-[#041282]
                  file:cursor-pointer cursor-pointer file:transition-colors"
              />
              {config.logo && (
                <div className="mt-2 p-2 border border-black/10 rounded">
                  <img src={config.logo} alt="Logo" className="h-8 object-contain" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3 · LAYOUT */}
        <section>
          <SectionHeading number="03" label="Layout" />

          <div className="space-y-4">
            {/* Template selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-black/30 mb-2">
                Plantilla
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {templates.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => onConfigChange({ target: { name: 'template', value, type: 'text' } })}
                    className={`py-2 px-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all border
                      ${config.template === value
                        ? 'bg-black text-white border-black'
                        : 'bg-transparent text-black/40 border-black/12 hover:border-black/30 hover:text-black/70'
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-0 divide-y divide-black/6">
              {[
                { name: 'showSummary', label: 'Cabeceras de sección' },
                { name: 'showDetailedTable', label: 'Tabla de datos' },
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center justify-between py-3 cursor-pointer group">
                  <span className="text-xs text-black/50 group-hover:text-black/80 transition-colors">{label}</span>
                  <div
                    className={`relative w-8 h-4 rounded-full transition-colors duration-200 ${
                      config[name] ? 'bg-black' : 'bg-black/15'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                        config[name] ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                    <input
                      type="checkbox"
                      name={name}
                      checked={config[name]}
                      onChange={onConfigChange}
                      className="sr-only"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · AI COPILOT */}
        <section>
          <GradientRule className="mb-6" />

          {/* Gradient accent label */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-black uppercase tracking-[0.14em]"
              style={{
                background: MAPPA_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ✦ AI Copilot
            </span>
          </div>

          <form onSubmit={handleAiSubmit} className="space-y-2">
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ej: Diseño minimalista, tonos navy, añade un resumen ejecutivo de los datos."
              disabled={recordCount === 0 || isAiLoading}
              rows={3}
              className="w-full bg-transparent border border-black/12 rounded px-3 py-2.5 text-xs text-black
                placeholder-black/25 outline-none focus:border-black/40 transition-colors resize-none
                disabled:opacity-40 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!aiPrompt.trim() || recordCount === 0 || isAiLoading}
              className="w-full py-2.5 rounded text-[11px] font-black uppercase tracking-widest text-white
                transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: isAiLoading ? '#999' : MAPPA_GRADIENT }}
            >
              {isAiLoading ? 'Procesando…' : 'Generar con IA'}
            </button>
          </form>
        </section>

        {/* Reset */}
        <section className="pb-4">
          <button
            onClick={onReset}
            className="w-full py-2 text-[11px] font-bold uppercase tracking-widest text-black/25
              border border-black/10 rounded hover:border-black/30 hover:text-black/50 transition-colors"
          >
            Reiniciar configuración
          </button>
        </section>
      </div>
    </aside>
  );
};