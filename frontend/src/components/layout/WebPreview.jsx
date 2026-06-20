
// ─── Brand constants ──────────────────────────────────────────────────────────
const MAPPA_GRADIENT = 'linear-gradient(90deg, #fdc2d8 0%, #fca65e 33%, #ff7983 66%, #041282 100%)';

const formatHeader = (str) =>
  str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// ─── Thin gradient rule ───────────────────────────────────────────────────────
const GradientRule = ({ style = {} }) => (
  <div style={{ height: 2, background: MAPPA_GRADIENT, borderRadius: 1, ...style }} />
);

// ─── STANDARD template ───────────────────────────────────────────────────────
const StandardDoc = ({ data, config, headers }) => (
  <div
    style={{
      background: '#fff',
      width: '210mm',
      fontFamily: "'BDO Grotesk', 'Inter', system-ui, sans-serif",
      color: '#000',
    }}
  >
    {/* PAGE 1: COVER */}
    <div style={{ minHeight: '297mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', textAlign: 'center' }}>
      {config.logo && (
        <img src={config.logo} alt="Logo" style={{ height: 60, objectFit: 'contain', marginBottom: 40 }} />
      )}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 20 }}>
        Products Carbon Footprint Report
      </p>
      <h1 style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#000', marginBottom: 32 }}>
        {config.title}
      </h1>
      <GradientRule style={{ width: 60, marginBottom: 32 }} />
      <p style={{ fontSize: 16, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: config.primaryColor }}>
        {config.company}
      </p>
      <p style={{ fontSize: 10, color: '#aaa', marginTop: 'auto', fontWeight: 600 }}>
        Generado el {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>

    {/* PAGE 2: CONTENT */}
    <div style={{ padding: '64px 72px', minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
      
      {/* Methodology */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}`, paddingBottom: 8, marginBottom: 16 }}>
          Methodological Approach
        </h3>
        <p style={{ fontSize: 10, lineHeight: 1.6, color: '#444', marginBottom: 12, textAlign: 'justify' }}>
          This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.
        </p>
        <p style={{ fontSize: 10, lineHeight: 1.6, color: '#444', textAlign: 'justify' }}>
          The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.
        </p>
      </div>

      {/* Data Section */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}`, paddingBottom: 8, marginBottom: 24 }}>
          Emissions Inventory Data
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {data.map((row, i) => (
            <div key={i} style={{ background: '#fafafa', borderRadius: 4, padding: '16px 20px', borderLeft: `3px solid ${config.primaryColor}` }}>
              {config.showSummary && (
                <h2 style={{ fontSize: 12, fontWeight: 800, color: '#111', marginBottom: 12 }}>
                  {row.product || row.entity || `Registro ${i + 1}`}
                </h2>
              )}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888' }}>
                        {formatHeader(h)}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#111', fontFamily: 'monospace' }}>
                        {row[h]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations (AI) */}
      {config.aiSummary && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: config.primaryColor, borderBottom: `2px solid ${config.primaryColor}`, paddingBottom: 8, marginBottom: 16 }}>
            Strategic Recommendations
          </h3>
          <div style={{ padding: '16px 20px', background: '#f8f8f8', borderLeft: `3px solid ${config.primaryColor}` }}>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: '#333' }}>{config.aiSummary}</p>
          </div>
        </div>
      )}
      
      <Footer company={config.company} />
    </div>
  </div>
);

// ─── MINIMAL template ────────────────────────────────────────────────────────
const MinimalDoc = ({ data, config, headers }) => (
  <div
    style={{
      background: '#fff',
      width: '210mm',
      fontFamily: "'BDO Grotesk', 'Inter', system-ui, sans-serif",
      color: '#000',
    }}
  >
    {/* PAGE 1: COVER */}
    <div style={{ minHeight: '297mm', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', textAlign: 'left' }}>
      {config.logo && (
        <img src={config.logo} alt="Logo" style={{ height: 60, objectFit: 'contain', marginBottom: 40 }} />
      )}
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#bbb', marginBottom: 16 }}>
        Products Carbon Footprint Report
      </p>
      <h1 style={{ fontSize: 40, fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#000', marginBottom: 24 }}>
        {config.title}
      </h1>
      <div style={{ height: 1, width: '100%', background: '#eee', marginBottom: 24 }} />
      <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000' }}>
        {config.company}
      </p>
      <p style={{ fontSize: 10, color: '#bbb', marginTop: 'auto' }}>
        {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>

    {/* PAGE 2: CONTENT */}
    <div style={{ padding: '60px 80px', minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
      
      {/* Methodology */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12, marginBottom: 20 }}>
          Methodological Approach
        </h3>
        <p style={{ fontSize: 10, lineHeight: 1.7, color: '#666', marginBottom: 12 }}>
          This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.
        </p>
        <p style={{ fontSize: 10, lineHeight: 1.7, color: '#666' }}>
          The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.
        </p>
      </div>

      {/* Data Section */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12, marginBottom: 24 }}>
          Emissions Inventory Data
        </h3>
        <div>
          {data.map((row, i) => (
            <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid #f9f9f9' }}>
              {config.showSummary && (
                <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#111', marginBottom: 16 }}>
                  {row.product || row.entity || `Registro ${i + 1}`}
                </h2>
              )}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                      <span style={{ fontSize: 9, color: '#999', letterSpacing: '0.04em', textTransform: 'capitalize' }}>
                        {formatHeader(h)}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#333', fontFamily: 'monospace' }}>
                        {row[h]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations (AI) */}
      {config.aiSummary && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#111', borderBottom: '1px solid #eee', paddingBottom: 12, marginBottom: 16 }}>
            Strategic Recommendations
          </h3>
          <p style={{ fontSize: 11, lineHeight: 1.8, color: '#444', fontStyle: 'italic' }}>{config.aiSummary}</p>
        </div>
      )}

      <Footer company={config.company} />
    </div>
  </div>
);

// ─── MODERN template ─────────────────────────────────────────────────────────
const ModernDoc = ({ data, config, headers }) => (
  <div
    style={{
      background: '#000',
      width: '210mm',
      fontFamily: "'BDO Grotesk', 'Inter', system-ui, sans-serif",
      color: '#fff',
      overflow: 'hidden',
    }}
  >
    {/* PAGE 1: COVER */}
    <div style={{ minHeight: '297mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px', textAlign: 'center', background: '#050505' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: MAPPA_GRADIENT }} />
      {config.logo && (
        <img 
          src={config.logo} 
          alt="Logo" 
          style={{ 
            height: 60, 
            objectFit: 'contain', 
            marginBottom: 40, 
          }} 
        />
      )}
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
        Products Carbon Footprint
      </p>
      <h1 style={{ fontSize: 44, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff', marginBottom: 40 }}>
        {config.title}
      </h1>
      <div style={{ width: 40, height: 2, background: MAPPA_GRADIENT, borderRadius: 1, marginBottom: 40 }} />
      <p style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
        {config.company}
      </p>
      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 'auto', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>

    {/* PAGE 2: CONTENT */}
    <div style={{ padding: '64px 56px', minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
      
      {/* Methodology */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: config.primaryColor, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Methodological Approach
        </h3>
        <p style={{ fontSize: 10, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginBottom: 12 }}>
          This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.
        </p>
        <p style={{ fontSize: 10, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>
          The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.
        </p>
      </div>

      {/* Data Section */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: config.primaryColor, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12, marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Emissions Inventory Data
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {data.map((row, i) => (
            <div key={i} style={{ borderLeft: `2px solid ${config.primaryColor}`, paddingLeft: 20 }}>
              {config.showSummary && (
                <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: 12 }}>
                  {row.product || row.entity || `Registro ${i + 1}`}
                </h2>
              )}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        {formatHeader(h)}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>
                        {row[h]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations (AI) */}
      {config.aiSummary && (
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: config.primaryColor, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Strategic Recommendations
          </h3>
          <div style={{ padding: '16px 20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: 11, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>{config.aiSummary}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Mappa Report Builder · {config.company}
        </span>
        <div style={{ width: 40, height: 2, background: MAPPA_GRADIENT, borderRadius: 1 }} />
      </div>
    </div>
  </div>
);

// ─── Footer (Standard + Minimal) ─────────────────────────────────────────────
const Footer = ({ company }) => (
  <div style={{ marginTop: 'auto', paddingTop: 40 }}>
    <GradientRule style={{ marginBottom: 12 }} />
    <p style={{ fontSize: 8, color: '#ccc', textAlign: 'center', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      Mappa Report Builder &nbsp;·&nbsp; {company}
    </p>
  </div>
);

// ─── Main export ──────────────────────────────────────────────────────────────
export const WebPreview = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]).filter(
    (h) => h !== 'product' && h !== 'entity'
  );

  const props = { data, config, headers };

  return (
    <div
      style={{
        // Drop shadow to give the document physical presence on the canvas
        filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.14)) drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
      }}
    >
      {config.template === 'modern' ? (
        <ModernDoc {...props} />
      ) : config.template === 'minimal' ? (
        <MinimalDoc {...props} />
      ) : (
        <StandardDoc {...props} />
      )}
    </div>
  );
};