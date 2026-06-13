import * as ExcelJS from 'exceljs';
import { ExcelExportOptions } from '../types';
import { normalizeColumns } from '../utils/formatters';

export async function exportToExcel(data: any[], options: ExcelExportOptions): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  const columns = normalizeColumns(data, options.columns);
  
  worksheet.columns = columns.map(col => ({
    header: col.label || col.key,
    key: col.key,
    width: 20
  }));

  worksheet.addRows(data);

  if (options.styles) {
    const headerRow = worksheet.getRow(1);
    if (options.styles.headerBackgroundColor) {
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: options.styles.headerBackgroundColor.replace('#', '') }
      };
    }
    if (options.styles.headerFontColor) {
      headerRow.font = {
        color: { argb: options.styles.headerFontColor.replace('#', '') },
        bold: true
      };
    }
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const fileName = options.fileName ? `${options.fileName}.xlsx` : 'report.xlsx';
  
  // Download logic (Browser compatible)
  if (typeof window !== 'undefined') {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    // Node.js
    const fs = require('fs');
    fs.writeFileSync(fileName, Buffer.from(buffer as ArrayBuffer));
  }
}
