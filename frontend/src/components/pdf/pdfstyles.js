import { StyleSheet } from '@react-pdf/renderer';

export const getPdfStyles = (config) => {
  const { template, primaryColor } = config;

  // 1. ESTILOS BASE (Comunes a todas las plantillas)
  const baseStyles = {
    page: { 
      fontFamily: 'Helvetica',
      backgroundColor: '#ffffff'
    },
    headerBox: {
      marginBottom: 30,
      flexDirection: 'row',
      alignItems: 'center', 
    },
    logo: {
      height: 40,
      marginRight: 15,
      objectFit: 'contain'
    },
    headerTextContainer: {
      flex: 1,
      justifyContent: 'center'
    },
    title: { 
      fontWeight: 'bold',
      marginBottom: 4
    },
    company: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: 1
    },
    section: { 
      marginBottom: 20 
    },
    sectionTitle: { 
      fontSize: 14, 
      marginBottom: 12, 
      fontWeight: 'bold' 
    },
    row: { 
      flexDirection: 'row', 
      paddingVertical: 6 
    },
    cellHeader: { 
      flex: 1, 
      fontSize: 9, 
      textTransform: 'capitalize'
    },
    cellData: { 
      flex: 1, 
      fontSize: 9, 
      textAlign: 'right',
      fontWeight: 'bold'
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 30,
      right: 30,
      textAlign: 'center',
      fontSize: 8,
      color: '#94a3b8',
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
      paddingTop: 10
    }
  };

  // 2. VARIACIONES POR PLANTILLA

  if (template === 'minimal') {
    return StyleSheet.create({
      ...baseStyles,
      page: { ...baseStyles.page, padding: 30 },
      headerBox: { ...baseStyles.headerBox, paddingBottom: 10 },
      title: { ...baseStyles.title, fontSize: 20, color: primaryColor },
      company: { ...baseStyles.company, color: '#94a3b8' },
      sectionTitle: { ...baseStyles.sectionTitle, color: primaryColor },
      row: { ...baseStyles.row, paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
      cellHeader: { ...baseStyles.cellHeader, color: '#64748b' },
      cellData: { ...baseStyles.cellData, color: '#334155' }
    });
  }

if (template === 'modern') {
    return StyleSheet.create({
      ...baseStyles,
      page: { ...baseStyles.page, padding: 40 },
      headerBox: { 
        ...baseStyles.headerBox, 
        backgroundColor: primaryColor, // <-- Restaurado
        padding: 24, 
        borderRadius: 8 
      },
      title: { ...baseStyles.title, fontSize: 24, color: '#ffffff' }, // <-- Restaurado
      company: { ...baseStyles.company, color: '#e2e8f0' },
      section: { 
        ...baseStyles.section, 
        borderLeftWidth: 4, 
        borderLeftColor: primaryColor, 
        paddingLeft: 16 
      },
      sectionTitle: { ...baseStyles.sectionTitle, color: '#0f172a' },
      row: { ...baseStyles.row, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }, // <-- Restaurado
      cellHeader: { ...baseStyles.cellHeader, color: '#475569' },
      cellData: { ...baseStyles.cellData, color: '#0f172a' }
    });
  }

  // STANDARD (Por defecto)
  return StyleSheet.create({
    ...baseStyles,
    page: { ...baseStyles.page, padding: 50 },
    headerBox: { 
      ...baseStyles.headerBox, 
      paddingBottom: 15, 
      borderBottomWidth: 2, 
      borderBottomColor: primaryColor 
    },
    title: { ...baseStyles.title, fontSize: 28, color: primaryColor },
    company: { ...baseStyles.company, color: '#64748b' },
    section: { 
      ...baseStyles.section, 
      padding: 15, 
      backgroundColor: '#f8fafc', 
      borderRadius: 6 
    },
    sectionTitle: { ...baseStyles.sectionTitle, color: primaryColor },
    row: { ...baseStyles.row, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    cellHeader: { ...baseStyles.cellHeader, color: '#475569' },
    cellData: { ...baseStyles.cellData, color: '#0f172a' }
  });
};