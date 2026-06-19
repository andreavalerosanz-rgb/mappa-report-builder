import { useState } from 'react';

export const ConfiguratorPanel = ({ config, onConfigChange, onFileUpload, onLogoUpload, loading, recordCount, onReset, onAiSubmit, isAiLoading }) => {
  // Estado local para el texto del usuario
  const [aiPrompt, setAiPrompt] = useState('');

  const handleAiSubmit = (e) => {
    e.preventDefault();
    onAiSubmit(aiPrompt);
    setAiPrompt(''); // Limpiamos el input después de enviar
  };

  return (
    <div className="w-1/3 h-full bg-white border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">

      {/* Cabecera del Panel */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Mappa Report Builder</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">Configuración de exportación</p>
      </div>

      {/* Contenido scrolleable */}
      <div className="p-6 flex-1 overflow-y-auto space-y-8">

        {/* SECCIÓN 1: Datos */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">1. Fuente de Datos</h3>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 transition-colors hover:border-blue-300">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-6 h-6 mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p className="text-xs text-slate-500 font-medium"><span className="text-blue-600 font-semibold">Sube un CSV</span> o arrástralo</p>
              </div>
              <input type="file" accept=".csv" className="hidden" onChange={onFileUpload} />
            </label>

            {loading && <p className="text-xs text-blue-600 animate-pulse mt-3 text-center font-medium">Procesando datos...</p>}
            {recordCount > 0 && !loading && (
              <div className="mt-3 bg-green-100 text-green-700 text-xs px-3 py-2 rounded border border-green-200 font-semibold text-center">
                ✓ {recordCount} registros sincronizados
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 2: Identidad */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">2. Identidad Visual</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Título del Reporte</label>
              <input
                type="text" name="title" value={config.title} onChange={onConfigChange}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Cliente / Organización</label>
              <input
                type="text" name="company" value={config.company} onChange={onConfigChange}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-md bg-slate-50">
              <label className="text-sm font-semibold text-slate-700">Color Principal</label>
              <input
                type="color" name="primaryColor" value={config.primaryColor} onChange={onConfigChange}
                className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 mt-2">
              <label className="text-sm font-semibold text-slate-700">Logo Corporativo</label>
              <input
                type="file"
                accept="image/*"
                onChange={onLogoUpload}
                className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
              {config.logo && (
                <div className="mt-2 p-2 bg-slate-50 border border-slate-200 rounded-md">
                  <img src={config.logo} alt="Logo preview" className="h-8 object-contain" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: Estructura */}
        <section>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">3. Layout</h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Plantilla Visual</label>
              <select
                name="template"
                value={config.template}
                onChange={onConfigChange}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="standard">Standard (Corporativa)</option>
                <option value="minimal">Minimal (Limpia)</option>
                <option value="modern">Modern (Bloques de color)</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox" name="showSummary" checked={config.showSummary} onChange={onConfigChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Mostrar cabeceras de sección</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox" name="showDetailedTable" checked={config.showDetailedTable} onChange={onConfigChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Incluir tabla de datos crudos</span>
              </label>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: AI COPILOT */}
        <section className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-wider mb-3 flex items-center gap-2">
            ✨ AI Copilot
          </h3>
          <form onSubmit={handleAiSubmit} className="space-y-3 relative">
            <textarea 
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ej: Haz el diseño minimalista, ponlo en tonos verdes y añade un resumen de los datos."
              disabled={recordCount === 0 || isAiLoading}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none min-h-[80px] disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!aiPrompt.trim() || recordCount === 0 || isAiLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAiLoading ? (
                <span className="animate-pulse">Pensando...</span>
              ) : (
                'Generar con IA'
              )}
            </button>
          </form>
        </section>

        {/* BOTÓN DE RESET */}
        <section className="pt-4">
          <button
            onClick={onReset}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-md transition-all active:scale-95 border border-red-200 text-sm"
          >
            Reiniciar Configuración
          </button>
        </section>
      </div>
    </div>
  );
};