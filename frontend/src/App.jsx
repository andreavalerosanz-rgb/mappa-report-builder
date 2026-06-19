import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from './components/pdf/Reportpdf';
import { ConfiguratorPanel } from './components/layout/ConfigPanel';
import { WebPreview } from './components/layout/WebPreview';

function App() {
  const [loading, setLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false); 

  // 1. ESTADO DE INTERFAZ (Inicializado desde localStorage si existe)
  const [config, setConfig] = useState(() => {
    const guardado = localStorage.getItem('mappa_config');
    if (guardado) return JSON.parse(guardado);
    
    return {
      title: 'Informe de Sostenibilidad',
      company: 'Relats',
      primaryColor: '#0f172a',
      template: 'standard',
      showSummary: true,
      showDetailedTable: true,
      logo: null,
      aiSummary: '', // <-- NUEVO CAMPO AI
    };
  });

  // Inicializar los datos del CSV desde localStorage
  const [reportData, setReportData] = useState(() => {
    const guardado = localStorage.getItem('mappa_data');
    if (guardado) return JSON.parse(guardado);
    return [];
  });

  // 2. EFECTOS DE PERSISTENCIA
  useEffect(() => {
    localStorage.setItem('mappa_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('mappa_data', JSON.stringify(reportData));
  }, [reportData]);

  // 3. ESTADO RETRASADO PARA EL PDF
  const [debouncedConfig, setDebouncedConfig] = useState(config);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedConfig(config);
    }, 500);
    return () => clearTimeout(timer);
  }, [config]);

  // --- MANEJADORES DE EVENTOS ---

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setConfig(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      setReportData(json);
    } catch (error) {
      console.error('Error subiendo el archivo:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN: COPILOTO AI ---
  const handleAiCopilot = async (prompt) => {
    if (!prompt || reportData.length === 0) return;
    
    setIsAiLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          config,
          data: reportData
        })
      });
      
      const aiUpdates = await response.json();
      
      // Fusionamos los cambios que decida la IA con la configuración actual
      setConfig(prev => ({ ...prev, ...aiUpdates }));
    } catch (error) {
      console.error("Error contactando al copiloto:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // BOTÓN DE EMERGENCIA
  const handleReset = () => {
    if(window.confirm("¿Estás segura de que quieres borrar todos los datos y la configuración?")) {
      localStorage.removeItem('mappa_config');
      localStorage.removeItem('mappa_data');
      window.location.reload(); 
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden text-slate-900">
      
      {/* PANEL IZQUIERDO */}
      <ConfiguratorPanel 
        config={config}
        onConfigChange={handleConfigChange}
        onFileUpload={handleFileUpload}
        onLogoUpload={handleLogoUpload}
        onReset={handleReset}
        onAiSubmit={handleAiCopilot} // <-- Pasamos la función AI
        isAiLoading={isAiLoading}    // <-- Pasamos el estado de carga
        loading={loading}
        recordCount={reportData.length}
      />

      {/* PANEL DERECHO: Workspace */}
      <div className="w-2/3 h-full flex flex-col bg-slate-100/80">
        
        {/* TOOLBAR SUPERIOR (Fija) */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Vista Previa del Documento</h2>
              <p className="text-xs text-slate-500 font-medium">{reportData.length > 0 ? 'Documento interactivo' : 'Esperando datos...'}</p>
            </div>
          </div>

          {reportData.length > 0 && (
            <PDFDownloadLink
              document={<ReportPDF data={reportData} config={debouncedConfig} />}
              fileName={`Reporte_${config.company.replace(/\s+/g, '_')}.pdf`}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md transition-all active:scale-95"
            >
              {({ loading }) => (
                loading ? 'Generando archivo...' : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Exportar PDF
                  </>
                )
              )}
            </PDFDownloadLink>
          )}
        </header>

        {/* ÁREA DE TRABAJO (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-24">
          {reportData.length > 0 ? (
             <WebPreview data={reportData} config={config} />
          ) : (
            <div className="mt-20 flex flex-col items-center text-slate-400">
              <div className="w-24 h-32 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center mb-4 bg-slate-50">
                 <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-base font-medium text-slate-500">Lienzo vacío</p>
              <p className="text-sm mt-1">Carga un CSV para previsualizar el informe</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;