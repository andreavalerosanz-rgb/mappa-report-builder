import { StyleSheet } from '@react-pdf/renderer';

// ─── Brand palette ────────────────────────────────────────────────────────────
// The gradient itself can't be reproduced in react-pdf (no CSS gradient support),
// so we use the endpoint colors strategically:
// · Navy (#041282) as the primary solid for headers / accents in Standard + Minimal
// · The gradient bar is approximated with a sequence of colored View strips in the PDF component
const NAVY = '#041282';
const CORAL = '#ff7983';
const ORANGE = '#fca65e';
const PINK = '#fdc2d8';

// ─── Base styles (shared across templates) ────────────────────────────────────
const base = {
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  headerBlock: {
    marginBottom: 32,
  },
  gradientBar: {
    // Approximated as a single-color rule; the PDF component renders the real multi-strip version
    height: 2,
    backgroundColor: NAVY,
    marginBottom: 0,
  },
  logo: {
    height: 36,
    marginBottom: 14,
    objectFit: 'contain',
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.5,
    lineHeight: 1.1,
    marginBottom: 4,
  },
  meta: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  aiSummaryBlock: {
    marginBottom: 28,
    padding: 14,
    backgroundColor: '#f8f8f8',
  },
  aiSummaryEyebrow: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  aiSummaryText: {
    fontSize: 9,
    lineHeight: 1.65,
    color: '#333333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cellKey: {
    fontSize: 7.5,
    color: '#aaaaaa',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    flex: 1,
  },
  cellVal: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    textAlign: 'right',
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 28,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 7,
    color: '#cccccc',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    paddingTop: 10,
  },
};

// ─── STANDARD ─────────────────────────────────────────────────────────────────
const buildStandard = (primaryColor) =>
  StyleSheet.create({
    page: { ...base.page, padding: 56 },
    headerBlock: { ...base.headerBlock },
    gradientBar: { ...base.gradientBar, backgroundColor: primaryColor },
    logo: base.logo,
    title: { ...base.title, fontSize: 26, color: '#000000' },
    meta: { ...base.meta },
    aiSummaryBlock: { ...base.aiSummaryBlock, borderLeftWidth: 3, borderLeftColor: primaryColor },
    aiSummaryEyebrow: base.aiSummaryEyebrow,
    aiSummaryText: base.aiSummaryText,
    section: { ...base.section, backgroundColor: '#fafafa', borderRadius: 3, padding: 14 },
    sectionDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: primaryColor,
      marginRight: 8,
      marginTop: 2,
    },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { ...base.sectionTitle, color: primaryColor, marginBottom: 0 },
    row: base.row,
    cellKey: base.cellKey,
    cellVal: base.cellVal,
    footer: base.footer,
  });

// ─── MINIMAL ──────────────────────────────────────────────────────────────────
const buildMinimal = () =>
  StyleSheet.create({
    page: { ...base.page, padding: '56px 72px' },
    headerBlock: { ...base.headerBlock, marginBottom: 40 },
    gradientBar: { display: 'none' },          
    logo: { ...base.logo, marginBottom: 18 },
    title: { ...base.title, fontSize: 22, color: '#000000' },
    meta: { ...base.meta },
    aiSummaryBlock: {
      ...base.aiSummaryBlock,
      backgroundColor: 'transparent',
      padding: 0,
      marginBottom: 32,
      borderBottomWidth: 1,
      borderBottomColor: '#eeeeee',
      paddingBottom: 20,
    },
    aiSummaryEyebrow: base.aiSummaryEyebrow,
    aiSummaryText: { ...base.aiSummaryText, fontStyle: 'italic', fontSize: 10, color: '#444444' },
    section: { ...base.section, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    sectionDot: { display: 'none' },
    sectionTitle: {
      ...base.sectionTitle,
      color: '#111111',
      fontSize: 8.5,
      letterSpacing: 1.5,
    },
    row: { ...base.row, borderBottomColor: '#f7f7f7', paddingVertical: 4 },
    cellKey: { ...base.cellKey, color: '#cccccc' },
    cellVal: { ...base.cellVal, color: '#333333', fontSize: 8 },
    footer: { ...base.footer, borderTopColor: '#f5f5f5' },
  });

// ─── MODERN (black background) ────────────────────────────────────────────────
const buildModern = (primaryColor) =>
  StyleSheet.create({
    page: { ...base.page, backgroundColor: '#000000', padding: 0 },
    // The gradient header band is painted by the PDF component using colored Views
    gradientHeaderBand: { padding: '36px 50px 32px' },
    headerBlock: { ...base.headerBlock, marginBottom: 0 },
    gradientBar: { display: 'none' },
    logo: { ...base.logo, marginBottom: 14 },
    title: { ...base.title, fontSize: 24, color: '#ffffff' },
    meta: { ...base.meta, color: 'rgba(255,255,255,0.5)' },
    contentArea: { padding: '36px 50px' },
    aiSummaryBlock: {
      ...base.aiSummaryBlock,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
      borderRadius: 3,
      marginBottom: 28,
    },
    aiSummaryEyebrow: { ...base.aiSummaryEyebrow, color: primaryColor },
    aiSummaryText: { ...base.aiSummaryText, color: 'rgba(255,255,255,0.6)' },
    section: { ...base.section, paddingLeft: 16, borderLeftWidth: 2, borderLeftColor: primaryColor },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    sectionDot: { display: 'none' },
    sectionTitle: { ...base.sectionTitle, color: '#ffffff', fontSize: 9, letterSpacing: 1.5, marginBottom: 0 },
    row: { ...base.row, borderBottomColor: 'rgba(255,255,255,0.07)', paddingVertical: 4.5 },
    cellKey: { ...base.cellKey, color: 'rgba(255,255,255,0.3)' },
    cellVal: { ...base.cellVal, color: '#ffffff', fontSize: 8 },
    footer: {
      ...base.footer,
      color: 'rgba(255,255,255,0.18)',
      borderTopColor: 'rgba(255,255,255,0.08)',
    },
    // The 4-segment gradient approximation bar used in the footer
    gradientBarSegments: { flexDirection: 'row', height: 2, borderRadius: 1 },
  });

// ─── Public API ───────────────────────────────────────────────────────────────
export const getPdfStyles = (config) => {
  const { template, primaryColor } = config;
  if (template === 'minimal') return buildMinimal(primaryColor);
  if (template === 'modern')  return buildModern(primaryColor);
  return buildStandard(primaryColor);
};

// Export brand colors so the PDF component can use them
export { NAVY, CORAL, ORANGE, PINK };