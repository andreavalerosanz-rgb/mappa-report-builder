import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { getPdfStyles, NAVY, CORAL, ORANGE, PINK } from './pdfstyles';

const formatHeader = (str) =>
  str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

// ─── Gradient bar approximation ───────────────────────────────────────────────
// react-pdf has no gradient support, so we tile 4 colored segments.
const GradientBar = ({ style = {} }) => (
  <View style={{ flexDirection: 'row', height: 2, ...style }}>
    {[PINK, ORANGE, CORAL, NAVY].map((color, i) => (
      <View key={i} style={{ flex: 1, backgroundColor: color }} />
    ))}
  </View>
);

// ─── Shared: AI Summary block ─────────────────────────────────────────────────
const AiSummaryBlock = ({ styles, aiSummary }) => (
  <View style={styles.aiSummaryBlock}>
    <Text style={styles.aiSummaryEyebrow}>Resumen Ejecutivo · AI</Text>
    <Text style={styles.aiSummaryText}>{aiSummary}</Text>
  </View>
);

// ─── Shared: Data rows ────────────────────────────────────────────────────────
const DataRows = ({ styles, row, headers, showSummary, showDetailedTable, index }) => (
  <View style={styles.section}>
    {showSummary && (
      <View style={styles.sectionTitleRow}>
        {styles.sectionDot?.display !== 'none' && (
          <View style={styles.sectionDot} />
        )}
        <Text style={styles.sectionTitle}>
          {row.product || row.entity || `Registro ${index + 1}`}
        </Text>
      </View>
    )}
    {showDetailedTable && (
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
);

// ─── STANDARD template ────────────────────────────────────────────────────────
const StandardPDF = ({ data, config, styles, headers }) => (
  <Page size="A4" style={styles.page}>
    {/* Header */}
    <View style={styles.headerBlock}>
      {config.logo && <Image src={config.logo} style={styles.logo} />}
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.meta}>
        {config.company}  ·  {new Date().toLocaleDateString('es-ES')}
      </Text>
      <GradientBar style={{ marginTop: 14 }} />
    </View>

    {config.aiSummary && <AiSummaryBlock styles={styles} aiSummary={config.aiSummary} />}

    {data.map((row, i) => (
      <DataRows
        key={i}
        styles={styles}
        row={row}
        headers={headers}
        showSummary={config.showSummary}
        showDetailedTable={config.showDetailedTable}
        index={i}
      />
    ))}

    <Text style={styles.footer} fixed>
      Generado con Mappa Report Builder · {config.company}
    </Text>
  </Page>
);

// ─── MINIMAL template ─────────────────────────────────────────────────────────
const MinimalPDF = ({ data, config, styles, headers }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.headerBlock}>
      {config.logo && <Image src={config.logo} style={styles.logo} />}
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.meta}>
        {config.company}  ·  {new Date().toLocaleDateString('es-ES')}
      </Text>
    </View>

    {config.aiSummary && <AiSummaryBlock styles={styles} aiSummary={config.aiSummary} />}

    {data.map((row, i) => (
      <DataRows
        key={i}
        styles={styles}
        row={row}
        headers={headers}
        showSummary={config.showSummary}
        showDetailedTable={config.showDetailedTable}
        index={i}
      />
    ))}

    <Text style={styles.footer} fixed>
      Mappa Report Builder · {config.company}
    </Text>
  </Page>
);

// ─── MODERN template (black bg) ───────────────────────────────────────────────
const ModernPDF = ({ data, config, styles, headers }) => (
  <Page size="A4" style={styles.page}>

    {/* Gradient header band — approximated with 4 colored strips side-by-side */}
    <View style={{ flexDirection: 'row', height: 100 }}>
      {[
        { color: PINK, content: null },
        { color: ORANGE, content: null },
        { color: CORAL, content: null },
        { color: NAVY, content: null },
      ].map(({ color }, i) => (
        <View key={i} style={{ flex: 1, backgroundColor: color }} />
      ))}
      {/* Overlay the text absolutely inside the band */}
    </View>

    {/* We overlay the header text on a semi-transparent black strip */}
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: '24px 44px',
        justifyContent: 'flex-end',
      }}
    >
      {config.logo && (
        <Image src={config.logo} style={{ ...styles.logo, marginBottom: 6 }} />
      )}
      <Text style={styles.title}>{config.title}</Text>
      <Text style={styles.meta}>
        {config.company}  ·  {new Date().toLocaleDateString('es-ES')}
      </Text>
    </View>

    {/* Content area */}
    <View style={styles.contentArea}>
      {config.aiSummary && <AiSummaryBlock styles={styles} aiSummary={config.aiSummary} />}

      {data.map((row, i) => (
        <DataRows
          key={i}
          styles={styles}
          row={row}
          headers={headers}
          showSummary={config.showSummary}
          showDetailedTable={config.showDetailedTable}
          index={i}
        />
      ))}
    </View>

    {/* Footer */}
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        left: 44,
        right: 44,
      }}
    >
      <GradientBar style={{ marginBottom: 8 }} />
      <Text style={styles.footer}>
        Mappa Report Builder · {config.company}
      </Text>
    </View>
  </Page>
);

// ─── Main export ──────────────────────────────────────────────────────────────
export const ReportPDF = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  const styles = getPdfStyles(config);
  const headers = Object.keys(data[0]).filter(
    (h) => h !== 'product' && h !== 'entity'
  );
  const props = { data, config, styles, headers };

  return (
    <Document>
      {config.template === 'modern'  && <ModernPDF {...props} />}
      {config.template === 'minimal' && <MinimalPDF {...props} />}
      {config.template !== 'modern' && config.template !== 'minimal' && <StandardPDF {...props} />}
    </Document>
  );
};