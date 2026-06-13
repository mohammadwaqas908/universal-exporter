import { PrintExportOptions } from '../types';
import { normalizeColumns } from '../utils/formatters';

export async function exportToPrint(data: any[], options: PrintExportOptions): Promise<string> {
  const columns = normalizeColumns(data, options.columns);
  const title = options.title || 'Data Report';
  const tableClass = options.styles?.tableClass || '';

  const thead = `<tr>${columns.map(col => `<th>${col.label || col.key}</th>`).join('')}</tr>`;
  const tbody = data.map(row => 
    `<tr>${columns.map(col => `<td>${row[col.key]}</td>`).join('')}</tr>`
  ).join('');

  const html = `
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        <table class="${tableClass}">
          <thead>${thead}</thead>
          <tbody>${tbody}</tbody>
        </table>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  if (typeof window !== 'undefined') {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
    }
  }

  return html; // Return HTML string for Node.js usage
}
