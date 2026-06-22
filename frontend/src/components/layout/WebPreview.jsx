import { getPdfStyles, NAVY, CORAL, ORANGE, PINK } from '../pdf/pdfstyles';

const formatHeader = (str) =>
  str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// Barra de colores para separar secciones Brand identity
const GradientBar = ({ style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'row', height: 2, ...style }}>
    {[PINK, ORANGE, CORAL, NAVY].map((color, i) => (
      <div key={i} style={{ flex: 1, backgroundColor: color }} />
    ))}
  </div>
);

/*const GradientBar = ({ style = {} }) => (
  <div style={{ 
    height: 2, 
    background: `linear-gradient(to right, ${PINK}, ${ORANGE}, ${CORAL}, ${NAVY})`,
    ...style 
  }} />
);*/

// Contenedor principal para la web
const WebDocContainer = ({ children }) => (
  <div style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))', padding: '20px 0', fontFamily: 'Helvetica, sans-serif' }}>
    {children}
  </div>
);

// ─── STANDARD template ───────────────────────────────────────────────────────
const StandardDoc = ({ data, config, headers, styles, dateStr }) => (
  <WebDocContainer>
    <div style={{ ...styles.page, ...styles.coverPage, width: '210mm', height: '297mm', position: 'relative' }}>
      {config.logo && <img src={config.logo} alt="Logo" style={styles.logo} />}
      <p style={{ ...styles.eyebrow, margin: 0, marginBottom: styles.eyebrow.marginBottom }}>Products Carbon Footprint Report</p>
      <h1 style={{ ...styles.coverTitle, margin: 0, marginBottom: styles.coverTitle.marginBottom }}>{config.title}</h1>
      <GradientBar style={{ width: 60, marginBottom: 32 }} />
      <p style={{ ...styles.coverCompany, margin: 0, marginTop: styles.coverCompany.marginTop }}>{config.company}</p>
      <p style={{ ...styles.coverDate, margin: 0 }}>Generado el {dateStr}</p>
    </div>

    <div style={{ ...styles.page, ...styles.contentPage, width: '210mm', minHeight: '297mm', position: 'relative' }}>
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Methodological Approach</h3>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.</p>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.</p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Emissions Inventory Data</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((row, i) => (
            <div key={i} style={styles.dataBlock}>
              {config.showSummary && <h2 style={{ ...styles.dataEntityTitle, margin: 0, marginBottom: styles.dataEntityTitle.marginBottom }}>{row.product || row.entity || `Registro ${i + 1}`}</h2>}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={styles.row}>
                      <span style={{ ...styles.cellKey, display: 'block' }}>{formatHeader(h)}</span>
                      <span style={{ ...styles.cellVal, display: 'block' }}>{row[h]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {config.aiSummary && (
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Strategic Recommendations</h3>
          <div style={styles.aiBox}>
            <p style={{ ...styles.aiText, margin: 0 }}>{config.aiSummary}</p>
          </div>
        </div>
      )}

      <div style={{ ...styles.footer, position: 'relative', bottom: 'auto', left: 'auto', right: 'auto', width: '100%', marginTop: 'auto', paddingTop: 40 }}>
        <GradientBar style={{ width: '100%' }} />
        <p style={{ ...styles.footerText, margin: 0, marginTop: styles.footerText.marginTop }}>Mappa Report Builder · {config.company}</p>
      </div>
    </div>
  </WebDocContainer>
);

// ─── MINIMAL template ────────────────────────────────────────────────────────
const MinimalDoc = ({ data, config, headers, styles, dateStr }) => (
  <WebDocContainer>
    <div style={{ ...styles.page, ...styles.coverPage, width: '210mm', height: '297mm', position: 'relative' }}>
      {config.logo && <img src={config.logo} alt="Logo" style={styles.logo} />}
      <p style={{ ...styles.eyebrow, margin: 0, marginBottom: styles.eyebrow.marginBottom }}>Products Carbon Footprint Report</p>
      <h1 style={{ ...styles.coverTitle, margin: 0, marginBottom: styles.coverTitle.marginBottom }}>{config.title}</h1>
      <div style={styles.coverRule} />
      <p style={{ ...styles.coverCompany, margin: 0 }}>{config.company}</p>
      <p style={{ ...styles.coverDate, margin: 0 }}>{dateStr}</p>
    </div>

    <div style={{ ...styles.page, ...styles.contentPage, width: '210mm', minHeight: '297mm', position: 'relative' }}>
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Methodological Approach</h3>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.</p>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.</p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Emissions Inventory Data</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((row, i) => (
            <div key={i} style={styles.dataBlock}>
              {config.showSummary && <h2 style={{ ...styles.dataEntityTitle, margin: 0, marginBottom: styles.dataEntityTitle.marginBottom }}>{row.product || row.entity || `Registro ${i + 1}`}</h2>}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={styles.row}>
                      <span style={{ ...styles.cellKey, display: 'block' }}>{formatHeader(h)}</span>
                      <span style={{ ...styles.cellVal, display: 'block' }}>{row[h]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {config.aiSummary && (
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Strategic Recommendations</h3>
          <div style={styles.aiBox}>
            <p style={{ ...styles.aiText, margin: 0 }}>{config.aiSummary}</p>
          </div>
        </div>
      )}

      <div style={{ ...styles.footer, position: 'relative', bottom: 'auto', left: 'auto', right: 'auto', width: '100%', marginTop: 'auto', paddingTop: 40 }}>
        <GradientBar style={{ width: '100%' }} />
        <p style={{ ...styles.footerText, margin: 0, marginTop: styles.footerText.marginTop }}>Mappa Report Builder · {config.company}</p>
      </div>
    </div>
  </WebDocContainer>
);

// ─── MODERN template ─────────────────────────────────────────────────────────
const ModernDoc = ({ data, config, headers, styles, dateStr }) => (
  <WebDocContainer>
    <div style={{ ...styles.page, ...styles.coverPage, width: '210mm', height: '297mm', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><GradientBar style={{ height: 6 }} /></div>
      {config.logo && <img src={config.logo} alt="Logo" style={styles.logo} />}
      <p style={{ ...styles.eyebrow, margin: 0, marginBottom: styles.eyebrow.marginBottom }}>Products Carbon Footprint</p>
      <h1 style={{ ...styles.coverTitle, margin: 0, marginBottom: styles.coverTitle.marginBottom }}>{config.title}</h1>
      <GradientBar style={{ width: 60, marginBottom: 40 }} />
      <p style={{ ...styles.coverCompany, margin: 0, marginTop: styles.coverCompany.marginTop }}>{config.company}</p>
      <p style={{ ...styles.coverDate, margin: 0 }}>{dateStr}</p>
    </div>

    <div style={{ ...styles.page, ...styles.contentPage, width: '210mm', minHeight: '297mm', position: 'relative' }}>
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Methodological Approach</h3>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.</p>
        <p style={{ ...styles.paragraph, margin: 0, marginBottom: styles.paragraph.marginBottom }}>The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.</p>
      </div>

      <div style={{ marginBottom: 40 }}>
        <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Emissions Inventory Data</h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((row, i) => (
            <div key={i} style={styles.dataBlock}>
              {config.showSummary && <h2 style={{ ...styles.dataEntityTitle, margin: 0, marginBottom: styles.dataEntityTitle.marginBottom }}>{row.product || row.entity || `Registro ${i + 1}`}</h2>}
              {config.showDetailedTable && (
                <div>
                  {headers.map((h) => (
                    <div key={h} style={styles.row}>
                      <span style={{ ...styles.cellKey, display: 'block' }}>{formatHeader(h)}</span>
                      <span style={{ ...styles.cellVal, display: 'block' }}>{row[h]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {config.aiSummary && (
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ ...styles.sectionTitle, margin: 0, marginBottom: styles.sectionTitle.marginBottom }}>Strategic Recommendations</h3>
          <div style={styles.aiBox}>
            <p style={{ ...styles.aiText, margin: 0 }}>{config.aiSummary}</p>
          </div>
        </div>
      )}

      <div style={{ ...styles.footer, position: 'relative', bottom: 'auto', left: 'auto', right: 'auto', width: '100%', marginTop: 'auto', paddingTop: 24 }}>
        <p style={{ ...styles.footerText, margin: 0 }}>Mappa Report Builder · {config.company}</p>
        <GradientBar style={{ width: 40 }} />
      </div>
    </div>
  </WebDocContainer>
);

export const WebPreview = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  const styles = getPdfStyles(config);
  const headers = Object.keys(data[0]).filter(h => h !== 'product' && h !== 'entity');
  const dateStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const props = { data, config, styles, headers, dateStr };

  return (
    <>
      {config.template === 'modern' ? <ModernDoc {...props} /> : 
       config.template === 'minimal' ? <MinimalDoc {...props} /> : 
       <StandardDoc {...props} />}
    </>
  );
};