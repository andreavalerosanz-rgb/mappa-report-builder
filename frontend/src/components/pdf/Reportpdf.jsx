import { Document, Page, Text, View } from '@react-pdf/renderer';
import { getPdfStyles } from './pdfstyles';

export const ReportPDF = ({ data, config }) => {
  if (!data || data.length === 0) return null;

  const styles = getPdfStyles(config);
  const headers = Object.keys(data[0]);
  const formatHeader = (str) => str.replace(/_/g, ' ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.headerBox}>
          {config.logo && (
            <Image src={config.logo} style={styles.logo} />
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{config.title}</Text>
            <Text style={styles.company}>{config.company} - {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {data.map((row, index) => (
          <View key={index} style={styles.section}>

            {config.showSummary && (
              <Text style={styles.sectionTitle}>
                {row.product || row.entity || `Registro ${index + 1}`}
              </Text>
            )}

            {config.showDetailedTable && (
              <View>
                {headers.map((header) => {
                  if (header === 'product' || header === 'entity') return null;

                  return (
                    <View style={styles.row} key={header}>
                      <Text style={styles.cellHeader}>{formatHeader(header)}</Text>
                      <Text style={styles.cellData}>{row[header]}</Text>
                    </View>
                  );
                })}
              </View>
            )}

          </View>
        ))}

        <Text style={styles.footer} fixed>
          Generado con Mappa Report Builder • Cliente: {config.company}
        </Text>

      </Page>
    </Document>
  );
};