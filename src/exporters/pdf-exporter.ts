import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PdfExportOptions } from '../types';
import { normalizeColumns } from '../utils/formatters';

export async function exportToPdf(data: any[], options: PdfExportOptions): Promise<void> {
  const doc = new jsPDF();
  const columns = normalizeColumns(data, options.columns);

  const head = [columns.map(col => col.label || col.key)];
  const body = data.map(row => columns.map(col => row[col.key]));

  const styles = options.styles || {};

  autoTable(doc, {
    head,
    body,
    theme: styles.theme || 'striped',
    headStyles: styles.headStyles,
    bodyStyles: styles.bodyStyles,
  });

  const fileName = options.fileName ? `${options.fileName}.pdf` : 'report.pdf';
  doc.save(fileName);
}
