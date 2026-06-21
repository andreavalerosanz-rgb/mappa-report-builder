import { StyleSheet } from '@react-pdf/renderer';

export const NAVY = '#041282';
export const CORAL = '#ff7983';
export const ORANGE = '#fca65e';
export const PINK = '#fdc2d8';

const base = {
  page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', color: '#000000' },
  // Compartido para la tipografía de las cabeceras de tabla
  cellKey: { fontSize: 8, color: '#888888', textTransform: 'uppercase', letterSpacing: 1, flex: 1 },
  cellVal: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#111111', textAlign: 'right', flex: 1 },
};

// ─── STANDARD ─────────────────────────────────────────────────────────────────
const buildStandard = (primaryColor) => StyleSheet.create({
  page: base.page,
  coverPage: { padding: 64, justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
  contentPage: { padding: '64px 72px 80px 72px' }, // extra bottom padding for footer
  
  logo: { height: 50, objectFit: 'contain', marginBottom: 40 },
  eyebrow: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 2, textTransform: 'uppercase', color: '#999999', marginBottom: 20 },
  coverTitle: { fontSize: 40, fontFamily: 'Helvetica-Bold', letterSpacing: -0.7, lineHeight: 1.1, color: '#000000', marginBottom: 32, textAlign: 'center' },
  coverCompany: { fontSize: 14, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase', color: primaryColor, marginTop: 32 },
  coverDate: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#aaaaaa', marginTop: 'auto' },

  sectionTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: primaryColor, borderBottomWidth: 2, borderBottomColor: primaryColor, paddingBottom: 8, marginBottom: 16 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: '#444444', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { backgroundColor: '#fafafa', borderRadius: 4, padding: '16px 20px', borderLeftWidth: 3, borderLeftColor: primaryColor, marginBottom: 20 },
  dataEntityTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#111111', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  cellKey: base.cellKey,
  cellVal: base.cellVal,

  aiBox: { backgroundColor: '#f8f8f8', padding: '16px 20px', borderLeftWidth: 3, borderLeftColor: primaryColor, marginBottom: 20 },
  aiText: { fontSize: 10, lineHeight: 1.6, color: '#333333' },

  footer: { position: 'absolute', bottom: 40, left: 72, right: 72, textAlign: 'center' },
  footerText: { fontSize: 8, color: '#cccccc', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12 },
});

// ─── MINIMAL ──────────────────────────────────────────────────────────────────
const buildMinimal = () => StyleSheet.create({
  page: base.page,
  coverPage: { padding: 80, justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' },
  contentPage: { padding: '60px 80px 80px 80px' },

  logo: { height: 40, objectFit: 'contain', marginBottom: 60 },
  eyebrow: { fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase', color: '#bbbbbb', marginBottom: 16 },
  coverTitle: { fontSize: 36, fontFamily: 'Helvetica', letterSpacing: -0.5, lineHeight: 1.1, color: '#000000', marginBottom: 24 },
  coverRule: { width: '100%', height: 1, backgroundColor: '#eeeeee', marginBottom: 24 },
  coverCompany: { fontSize: 12, fontFamily: 'Helvetica-Bold', letterSpacing: 1.2, textTransform: 'uppercase', color: '#000000' },
  coverDate: { fontSize: 10, color: '#bbbbbb', marginTop: 'auto' },

  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1, color: '#111111', borderBottomWidth: 1, borderBottomColor: '#eeeeee', paddingBottom: 10, marginBottom: 20 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: '#666666', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { marginBottom: 32, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: '#f9f9f9' },
  dataEntityTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 1, textTransform: 'uppercase', color: '#111111', marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 },
  cellKey: { ...base.cellKey, color: '#999999' },
  cellVal: { ...base.cellVal, color: '#333333' },

  aiBox: { marginBottom: 20 },
  aiText: { fontSize: 10, lineHeight: 1.6, color: '#444444', fontStyle: 'italic' },

  footer: { position: 'absolute', bottom: 40, left: 80, right: 80, textAlign: 'center' },
  footerText: { fontSize: 8, color: '#cccccc', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12 },
});

// ─── MODERN ───────────────────────────────────────────────────────────────────
const buildModern = (primaryColor) => StyleSheet.create({
  page: { ...base.page, backgroundColor: '#000000', color: '#ffffff' },
  coverPage: { backgroundColor: '#050505', padding: 64, justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
  contentPage: { padding: '64px 56px 80px 56px' },

  logo: { height: 48, objectFit: 'contain', marginBottom: 40, backgroundColor: '#ffffff', borderRadius: 4 },
  eyebrow: { fontSize: 10, fontFamily: 'Helvetica-Bold', letterSpacing: 2.5, textTransform: 'uppercase', color: '#777777', marginBottom: 20 },
  coverTitle: { fontSize: 38, fontFamily: 'Helvetica-Bold', letterSpacing: -0.5, lineHeight: 1.1, color: '#ffffff', marginBottom: 40, textAlign: 'center' },
  coverCompany: { fontSize: 12, fontFamily: 'Helvetica-Bold', letterSpacing: 1.5, textTransform: 'uppercase', color: '#cccccc', marginTop: 40 },
  coverDate: { fontSize: 9, color: '#666666', marginTop: 'auto', letterSpacing: 1, textTransform: 'uppercase' },

  sectionTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomColor: '#1a1a1a', paddingBottom: 10, marginBottom: 20 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: '#999999', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { borderLeftWidth: 2, borderLeftColor: primaryColor, paddingLeft: 16, marginBottom: 24 },
  dataEntityTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', letterSpacing: 1, textTransform: 'uppercase', color: '#ffffff', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#0f0f0f' },
  cellKey: { ...base.cellKey, color: '#666666' },
  cellVal: { ...base.cellVal, color: '#ffffff' },

  aiBox: { backgroundColor: '#050505', padding: '16px 20px', borderWidth: 1, borderColor: '#1a1a1a', borderRadius: 4, marginBottom: 20 },
  aiText: { fontSize: 10, lineHeight: 1.6, color: '#cccccc' },

  footer: { position: 'absolute', bottom: 40, left: 56, right: 56, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1a1a1a', paddingTop: 16 },
  footerText: { fontSize: 8, color: '#4d4d4d', textTransform: 'uppercase', letterSpacing: 1 },
});

export const getPdfStyles = (config) => {
  const { template, primaryColor } = config;
  if (template === 'minimal') return buildMinimal();
  if (template === 'modern') return buildModern(primaryColor);
  return buildStandard(primaryColor);
};