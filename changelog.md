hangelog

## [released] - Path B Implementation

### Added
- **Dynamic Configuration Panel**: Added a sidebar UI to control report parameters (Title, Company, Primary Color).
- **Multiple Templates**: Implemented a template engine supporting `Standard`, `Minimal`, and `Modern` layouts.
- **Logo Upload**: Added support for custom branding via Base64 image processing.
- **Data Persistence**: Integrated `localStorage` to save configuration state and CSV data between page reloads.
- **Web Preview Component**: Created a 1:1 HTML/Tailwind replica of the A4 PDF for instant, lag-free user feedback.

### Changed
- **PDF Rendering Strategy**: Migrated from live `<PDFViewer>` to on-demand `<PDFDownloadLink>` to eliminate the native iframe re-rendering bottleneck (blink effect) and improve UX.
- **State Management**: Separated UI state (instant) from PDF generation state (debounced by 500ms) to optimize CPU usage.

### Fixed
- **Layout Overflow**: Resolved flexbox height constraints in the WebPreview to ensure the A4 canvas grows dynamically with large datasets.