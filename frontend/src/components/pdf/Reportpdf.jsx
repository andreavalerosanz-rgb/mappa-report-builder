import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { getPdfStyles, NAVY, CORAL, ORANGE, PINK } from './pdfstyles';

const formatHeader = (str) =>
  str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// Barra de gradiente para el PDF
const GradientBar = ({ style = {} }) => (
  <View style={{ flexDirection: 'row', height: 2, ...style }}>
    {[PINK, ORANGE, CORAL, NAVY].map((color, i) => (
      <View key={i} style={{ flex: 1, backgroundColor: color }} />
    ))}
  </View>
);

// ─── Bloques de Contenido Reutilizables ────────────────────────────────────────
const Methodology = ({ styles }) => (
  <View style={{ marginBottom: 40 }}>
    <Text style={styles.sectionTitle}>Methodological Approach</Text>
    <Text style={styles.paragraph}>
      This assessment has been carried out in accordance with internationally recognised standards: ISO 14067:2018 (Greenhouse gases – Carbon footprint of products) and the GHG Protocol. Life-cycle inventory data from reputable databases ensure robustness, comparability, and auditability of results.
    </Text>
    <Text style={styles.paragraph}>
      The scope of the assessment follows a cradle-to-gate approach. It includes all relevant life-cycle stages: raw materials and packaging acquisition, upstream freight transportation, energy and consumables from manufacturing processes, and downstream waste transportation.
    </Text>
  </View>
);

const EmissionsData = ({ data, config, headers, styles }) => (
  <View style={{ marginBottom: 40 }}>
    <Text style={styles.sectionTitle}>Emissions Inventory Data</Text>
    <View style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {data.map((row, i) => (
        <View key={i} style={[styles.dataBlock, { gap: 20 }]} wrap={true}>
          {config.showSummary && (
            <Text style={styles.dataEntityTitle}>
              {row.product || row.entity || `Registro ${i + 1}`}
            </Text>
          )}
          {config.showDetailedTable && (
            <View>
              {headers.map((h) => (
                <View style={styles.row} key={h}>
                  <Text style={styles.cellKey}>{formatHeader(h)}</Text>
                  <Text style={styles.cellVal}>{row[h]}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  </View>
);

const Recommendations = ({ config, styles }) => {
  if (!config.aiSummary) return null;
  return (
    <View style={{ marginBottom: 30 }} wrap={false}>
      <Text style={styles.sectionTitle}>Strategic Recommendations</Text>
      <View style={styles.aiBox}>
        <Text style={styles.aiText}>{config.aiSummary}</Text>
      </View>
    </View>
  );
};

// ─── Plantillas Principales (2 Páginas cada una) ──────────────────────────────
const StandardPDF = ({ data, config, styles, headers, dateStr }) => (
  <>
    <Page size="A4" style={[styles.page, styles.coverPage]}>
      {config.logo && <Image src={config.logo} style={styles.logo} />}
      <Text style={styles.eyebrow}>Products Carbon Footprint Report</Text>
      <Text style={styles.coverTitle}>{config.title}</Text>
      <GradientBar style={{ width: 60, marginBottom: 32 }} />
      <Text style={styles.coverCompany}>{config.company}</Text>
      <Text style={styles.coverDate}>Generado el {dateStr}</Text>
    </Page>
    <Page size="A4" style={[styles.page, styles.contentPage]}>
      <Methodology styles={styles} />
      <EmissionsData data={data} config={config} headers={headers} styles={styles} />
      <Recommendations config={config} styles={styles} />
      <View style={styles.footer} fixed>
        <GradientBar style={{ width: '100%' }} />
        <Text style={styles.footerText}>Mappa Report Builder · {config.company}</Text>
      </View>
    </Page>
  </>
);

const MinimalPDF = ({ data, config, styles, headers, dateStr }) => (
  <>
    <Page size="A4" style={[styles.page, styles.coverPage]}>
      {config.logo && <Image src={config.logo} style={styles.logo} />}
      <Text style={styles.eyebrow}>Products Carbon Footprint Report</Text>
      <Text style={styles.coverTitle}>{config.title}</Text>
      <View style={styles.coverRule} />
      <Text style={styles.coverCompany}>{config.company}</Text>
      <Text style={styles.coverDate}>{dateStr}</Text>
    </Page>
    <Page size="A4" style={[styles.page, styles.contentPage]}>
      <Methodology styles={styles} />
      <EmissionsData data={data} config={config} headers={headers} styles={styles} />
      <Recommendations config={config} styles={styles} />
      <View style={styles.footer} fixed>
        <GradientBar style={{ width: '100%' }} />
        <Text style={styles.footerText}>Mappa Report Builder · {config.company}</Text>
      </View>
    </Page>
  </>
);

const ModernPDF = ({ data, config, styles, headers, dateStr }) => (
  <>
    <Page size="A4" style={[styles.page, styles.coverPage]}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}><GradientBar style={{ height: 6 }} /></View>
      {config.logo && <Image src={config.logo} style={styles.logo} />}
      <Text style={styles.eyebrow}>Products Carbon Footprint</Text>
      <Text style={styles.coverTitle}>{config.title}</Text>
      <GradientBar style={{ width: 40, marginBottom: 40 }} />
      <Text style={styles.coverCompany}>{config.company}</Text>
      <Text style={styles.coverDate}>{dateStr}</Text>
    </Page>
    <Page size="A4" style={[styles.page, styles.contentPage]}>
      <Methodology styles={styles} />
      <EmissionsData data={data} config={config} headers={headers} styles={styles} />
      <Recommendations config={config} styles={styles} />
      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>Mappa Report Builder · {config.company}</Text>
        <GradientBar style={{ width: 40 }} />
      </View>
    </Page>
  </>
);

// ─── Exportador Principal ─────────────────────────────────────────────────────
export const ReportPDF = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  // Convertimos el objeto en bruto de pdfstyles a un formato compatible con PDF
  const rawStyles = getPdfStyles(config);
  const styles = StyleSheet.create(rawStyles);

  const headers = Object.keys(data[0]).filter(h => h !== 'product' && h !== 'entity');
  const dateStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const props = { data, config, styles, headers, dateStr };

  return (
    <Document>
      {config.template === 'modern' && <ModernPDF {...props} />}
      {config.template === 'minimal' && <MinimalPDF {...props} />}
      {config.template === 'standard' && <StandardPDF {...props} />}
    </Document>
  );
};