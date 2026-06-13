export * from './types';
export { exportToPdf } from './exporters/pdf-exporter';
export { exportToExcel } from './exporters/excel-exporter';
export { exportToCsv } from './exporters/csv-exporter';
export { exportToPrint } from './exporters/print-exporter';

import { ExportOptions } from './types';
import { exportToPdf } from './exporters/pdf-exporter';
import { exportToExcel } from './exporters/excel-exporter';
import { exportToCsv } from './exporters/csv-exporter';
import { exportToPrint } from './exporters/print-exporter';

/**
 * Main export function.
 * @param data Array of JSON objects to export.
 * @param options Export configuration including format.
 */
export async function exportData(data: any[], options: ExportOptions): Promise<any> {
  if (!data || data.length === 0) {
    throw new Error('Data array is empty or undefined.');
  }

  switch (options.format) {
    case 'pdf':
      return await exportToPdf(data, options);
    case 'excel':
      return await exportToExcel(data, options);
    case 'csv':
      return await exportToCsv(data, options);
    case 'print':
      return await exportToPrint(data, options);
    default:
      throw new Error(`Unsupported export format`);
  }
}
