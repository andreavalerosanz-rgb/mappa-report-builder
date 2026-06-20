import { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ReportPDF } from './components/pdf/Reportpdf';
import { ConfiguratorPanel } from './components/layout/ConfigPanel';
import { WebPreview } from './components/layout/WebPreview';

function App() {
  const [loading, setLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('mappa_config');
    if (saved) return JSON.parse(saved);
    return {
      title: 'Informe de Sostenibilidad',
      company: 'Relats',
      primaryColor: '#041282',
      template: 'standard',
      showSummary: true,
      showDetailedTable: true,
      logo: null,
      aiSummary: '',
    };
  });

  const [reportData, setReportData] = useState(() => {
    const saved = localStorage.getItem('mappa_data');
    if (saved) return JSON.parse(saved);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('mappa_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('mappa_data', JSON.stringify(reportData));
  }, [reportData]);

  const [debouncedConfig, setDebouncedConfig] = useState(config);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedConfig(config), 500);
    return () => clearTimeout(timer);
  }, [config]);

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setConfig(prev => ({ ...prev, logo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const json = await response.json();
      
      // SALVAGUARDA 1: Comprobar que el servidor devuelve datos válidos
      if (Array.isArray(json)) {
        setReportData(json);
      } else {
        console.error('Error procesando CSV:', json);
        alert(json.error || 'Error del servidor al procesar el archivo.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error de conexión al subir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleAiCopilot = async (prompt) => {
    if (!prompt || reportData.length === 0) return;
    setIsAiLoading(true);
    try {

const configWithoutLogo = { ...config };
delete configWithoutLogo.logo;

      // SALVAGUARDA 2: Recortar los datos a 5 registros para no saturar el servidor (Payload Too Large)
      const dataSample = reportData.slice(0, 5);

      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, config: configWithoutLogo, data: dataSample }),
      });

      if (!response.ok) {
        throw new Error('Error en el servidor: ' + response.statusText);
      }

      const aiUpdates = await response.json();
      
      // SALVAGUARDA 3: Evitar corrupción de estado si el backend devuelve un string de error
      if (aiUpdates && typeof aiUpdates === 'object' && !Array.isArray(aiUpdates)) {
        setConfig(prev => ({ ...prev, ...aiUpdates }));
      } else {
        console.error("Respuesta no válida de la IA:", aiUpdates);
      }
    } catch (error) {
      console.error('AI copilot error:', error);
      alert("No se pudo conectar con el Copiloto IA. Verifica que el servidor esté activo.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Borrar todos los datos y la configuración?')) {
      localStorage.removeItem('mappa_config');
      localStorage.removeItem('mappa_data');
      window.location.reload();
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans text-black">

      {/* LEFT: Configurator */}
      <ConfiguratorPanel
        config={config}
        onConfigChange={handleConfigChange}
        onFileUpload={handleFileUpload}
        onLogoUpload={handleLogoUpload}
        onReset={handleReset}
        onAiSubmit={handleAiCopilot}
        isAiLoading={isAiLoading}
        loading={loading}
        recordCount={reportData.length}
      />

      {/* RIGHT: Canvas */}
      <div className="flex flex-col flex-1 h-full bg-[#f5f5f5] overflow-hidden">

        {/* Toolbar */}
        <header className="h-14 bg-white border-b border-black/10 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mappa gradient wordmark pill */}
            <span
              className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
              style={{
                background: 'linear-gradient(90deg, #fdc2d8, #fca65e, #ff7983, #041282)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Vista Previa
            </span>
            <span className="text-xs text-black/30 font-medium">
              {reportData.length > 0
                ? `${reportData.length} registros · Documento activo`
                : 'Sin datos — sube un CSV para empezar'}
            </span>
          </div>

          {reportData.length > 0 && (
            <PDFDownloadLink
              document={<ReportPDF data={reportData} config={debouncedConfig} />}
              fileName={`Mappa_${config.company.replace(/\s+/g, '_')}.pdf`}
              className="flex items-center gap-2 bg-black hover:bg-[#041282] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest transition-colors duration-200 active:scale-95"
            >
              {({ loading }) =>
                loading ? 'Generando…' : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Exportar PDF
                  </>
                )
              }
            </PDFDownloadLink>
          )}
        </header>

        {/* Canvas stage */}
        <div className="flex-1 overflow-y-auto flex justify-center items-start p-10 pb-24">
          {reportData.length > 0 ? (
            <WebPreview data={reportData} config={config} />
          ) : (
            <div className="mt-24 flex flex-col items-center text-center">
              {/* Gradient rectangle as empty-state visual */}
              <div
                className="w-20 h-28 rounded mb-6 opacity-20"
                style={{ background: 'linear-gradient(135deg, #fdc2d8, #fca65e, #ff7983, #041282)' }}
              />
              <p className="text-sm font-bold uppercase tracking-widest text-black/30 mb-1">Lienzo vacío</p>
              <p className="text-xs text-black/20">Carga un CSV para previsualizar el informe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;