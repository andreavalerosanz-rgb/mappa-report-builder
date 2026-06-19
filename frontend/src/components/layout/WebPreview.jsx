
export const WebPreview = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);
  
  // Banderas para identificar qué plantilla está activa
  const isMinimal = config.template === 'minimal';
  const isModern = config.template === 'modern';

  const formatHeader = (str) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div 
      className="bg-white mx-auto h-max rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.05)] ring-1 ring-slate-200 transition-all duration-300" 
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        // Ajustamos el padding general según la plantilla
        padding: isMinimal ? '50px 60px' : (isModern ? '50px' : '60px 80px') 
      }}
    >
      {/* CABECERA DINÁMICA */}
<div 
        className={`mb-12 flex items-center gap-6 ${
          isMinimal ? 'pb-6' : 
          isModern ? 'p-8 rounded-xl shadow-md mb-10' : 
          'pb-6 border-b-2'
        }`}
        style={{ 
          borderColor: isModern ? 'transparent' : config.primaryColor,
          backgroundColor: isModern ? config.primaryColor : 'transparent' 
        }}
      >
        {config.logo && (
          <img 
            src={config.logo} 
            alt="Logo" 
            className={`h-16 object-contain}`} 
          />
        )}
        
        <div>
          <h1 
            className={`${isMinimal ? 'text-3xl' : 'text-4xl'} font-bold mb-2 tracking-tight`}
            style={{ color: isModern ? '#ffffff' : config.primaryColor }}
          >
            {config.title}
          </h1>
          <p 
            className="text-xs font-bold uppercase tracking-widest mt-1"
            style={{ color: isModern ? '#e2e8f0' : '#94a3b8' }}
          >
            {config.company} <span className="mx-2">•</span> {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

{/* RESUMEN GENERADO POR IA */}
{config.aiSummary && (
        <div className="mb-10 p-6 bg-slate-50 border-l-4 border-slate-300 rounded-r-lg" style={{ borderLeftColor: config.primaryColor }}>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Resumen Ejecutivo (AI)</h3>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {config.aiSummary}
          </p>
        </div>
      )}
      {/* BUCLE DE DATOS */}
      <div className="space-y-10">
        {data.map((row, index) => (
          <div 
            key={index} 
            // Si es modern, aplicamos el borde izquierdo
            className={`${isMinimal ? 'p-0' : isModern ? 'pl-6 border-l-4' : 'p-0 bg-transparent'}`}
            style={{ borderColor: isModern ? config.primaryColor : 'transparent' }}
          >
            
            {/* RESUMEN */}
            {config.showSummary && (
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-3" 
                style={{ color: isModern ? '#0f172a' : config.primaryColor }}
              >
                {/* El circulito de color solo va en la Standard */}
                {!isMinimal && !isModern && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.primaryColor }}></div>
                )}
                {row.product || row.entity || `Registro ${index + 1}`}
              </h2>
            )}

            {/* TABLA DETALLADA */}
            {config.showDetailedTable && (
              <div className={`flex flex-col ${isModern ? '' : 'border-t border-slate-100'}`}>
                {headers.map((header) => {
                  if (header === 'product' || header === 'entity') return null;
                  
                  return (
                    <div 
                      key={header} 
                      className="flex justify-between items-center py-2.5 border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-medium text-slate-500 w-1/2 pr-4 leading-relaxed">
                        {formatHeader(header)}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 text-right w-1/2">
                        {row[header]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};