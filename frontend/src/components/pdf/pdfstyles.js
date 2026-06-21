export const NAVY = '#041282';
export const CORAL = '#ff7983';
export const ORANGE = '#fca65e';
export const PINK = '#fdc2d8';

const base = {
  page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', color: '#000000', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  cellKey: { fontSize: 9, color: '#888888', textTransform: 'uppercase', letterSpacing: 0.5, flex: 1 },
  cellVal: { fontSize: 10, fontWeight: 700, color: '#111111', textAlign: 'right', flex: 1 },
};

// ─── STANDARD ─────────────────────────────────────────────────────────────────
const buildStandard = (primaryColor) => ({
  page: base.page,
  coverPage: { paddingTop: 64, paddingRight: 64, paddingBottom: 64, paddingLeft: 64, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box', gap: 20 },
  contentPage: { paddingTop: 64, paddingRight: 72, paddingBottom: 80, paddingLeft: 72, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },
  
  logo: { height: 60, objectFit: 'contain', marginBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#999999', marginBottom: 20 },
  coverTitle: { fontSize: 50, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1, color: '#000000', marginBottom: 32, textAlign: 'center' },
  coverCompany: { fontSize: 16, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: primaryColor },
  coverDate: { position: 'absolute', bottom: 64, fontSize: 10, fontWeight: 700, color: '#aaaaaa' },

  sectionTitle: { fontSize: 16, fontWeight: 700, color: primaryColor, borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: primaryColor, paddingBottom: 8, marginBottom: 16 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: '#444444', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { backgroundColor: '#fafafa', borderRadius: 4, paddingTop: 16, paddingRight: 20, paddingBottom: 16, paddingLeft: 20, borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: primaryColor, marginBottom: 20, display: 'flex', flexDirection: 'column' },
  dataEntityTitle: { fontSize: 12, fontWeight: 700, color: '#111111', marginBottom: 12 },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4, paddingBottom: 4, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f0f0f0' },
  cellKey: base.cellKey,
  cellVal: base.cellVal,

  aiBox: { backgroundColor: '#f8f8f8', paddingTop: 16, paddingRight: 20, paddingBottom: 16, paddingLeft: 20, borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: primaryColor, marginBottom: 20, display: 'flex', flexDirection: 'column' },
  aiText: { fontSize: 11, lineHeight: 1.7, color: '#333333' },

  footer: { position: 'absolute', bottom: 40, left: 72, right: 72, textAlign: 'center', display: 'flex', flexDirection: 'column' },
  footerText: { fontSize: 8, color: '#cccccc', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12 },
});

// ─── MINIMAL ──────────────────────────────────────────────────────────────────
const buildMinimal = () => ({
  page: base.page,
  coverPage: { paddingTop: 80, paddingRight: 80, paddingBottom: 80, paddingLeft: 80, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left', boxSizing: 'border-box' },
  contentPage: { paddingTop: 60, paddingRight: 80, paddingBottom: 80, paddingLeft: 80, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },

  logo: { height: 60, objectFit: 'contain', marginBottom: 40 },
  eyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#bbbbbb', marginBottom: 16 },
  coverTitle: { fontSize: 40, fontWeight: 400, letterSpacing: -0.5, lineHeight: 1.1, color: '#000000', marginBottom: 24 },
  coverRule: { width: '100%', height: 1, backgroundColor: '#eeeeee', marginBottom: 24 },
  coverCompany: { fontSize: 14, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: '#000000' },
  coverDate: { position: 'absolute', bottom: 80, left: 80, fontSize: 10, color: '#bbbbbb' },

  sectionTitle: { fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#111111', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#eeeeee', paddingBottom: 12, marginBottom: 20 },
  paragraph: { fontSize: 10, lineHeight: 1.7, color: '#666666', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { marginBottom: 32, paddingBottom: 32, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#f9f9f9', display: 'flex', flexDirection: 'column' },
  dataEntityTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#111111', marginBottom: 16 },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, paddingBottom: 6 },
  cellKey: { ...base.cellKey, color: '#999999' },
  cellVal: { ...base.cellVal, color: '#333333' },

  aiBox: { marginBottom: 20, display: 'flex', flexDirection: 'column' },
  aiText: { fontSize: 11, lineHeight: 1.8, color: '#444444', fontStyle: 'italic' },

  footer: { position: 'absolute', bottom: 40, left: 80, right: 80, textAlign: 'center', display: 'flex', flexDirection: 'column' },
  footerText: { fontSize: 8, color: '#cccccc', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12 },
});

// ─── MODERN ───────────────────────────────────────────────────────────────────
const buildModern = (primaryColor) => ({
  page: { ...base.page, backgroundColor: '#000000', color: '#ffffff' },
  coverPage: { backgroundColor: '#050505', paddingTop: 64, paddingRight: 64, paddingBottom: 64, paddingLeft: 64, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box', gap: 20},
  contentPage: { paddingTop: 64, paddingRight: 56, paddingBottom: 80, paddingLeft: 56, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' },

  logo: { height: 60, objectFit: 'contain', marginBottom: 40, backgroundColor: '#ffffff', borderRadius: 4 },
  eyebrow: { fontSize: 10, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: '#777777', marginBottom: 20 },
  coverTitle: { fontSize: 50, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1, color: '#ffffff', marginBottom: 40, textAlign: 'center' },
  coverCompany: { fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#cccccc' },
  coverDate: { position: 'absolute', bottom: 64, fontSize: 9, color: '#666666', letterSpacing: 1, textTransform: 'uppercase' },

  sectionTitle: { fontSize: 14, fontWeight: 700, color: primaryColor, textTransform: 'uppercase', letterSpacing: 1, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1a1a1a', paddingBottom: 12, marginBottom: 20 },
  paragraph: { fontSize: 10, lineHeight: 1.6, color: '#999999', marginBottom: 12, textAlign: 'justify' },

  dataBlock: { borderLeftWidth: 2, borderLeftStyle: 'solid', borderLeftColor: primaryColor, paddingLeft: 20, marginBottom: 24, display: 'flex', flexDirection: 'column' },
  dataEntityTitle: { fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#ffffff', marginBottom: 12 },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, paddingBottom: 6, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#0f0f0f' },
  cellKey: { ...base.cellKey, color: '#666666' },
  cellVal: { ...base.cellVal, color: '#ffffff' },

  aiBox: { backgroundColor: '#080808', paddingTop: 16, paddingRight: 20, paddingBottom: 16, paddingLeft: 20, borderWidth: 1, borderStyle: 'solid', borderColor: '#1a1a1a', borderRadius: 4, marginBottom: 20, display: 'flex', flexDirection: 'column' },
  aiText: { fontSize: 11, lineHeight: 1.7, color: '#cccccc' },

  footer: { position: 'absolute', bottom: 40, left: 56, right: 56, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#1a1a1a', paddingTop: 24 },
  footerText: { fontSize: 8, color: '#4d4d4d', textTransform: 'uppercase', letterSpacing: 1 },
});

export const getPdfStyles = (config) => {
  const { template, primaryColor } = config;
  if (template === 'minimal') return buildMinimal();
  if (template === 'modern') return buildModern(primaryColor);
  return buildStandard(primaryColor);
};