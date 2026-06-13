import { Parser } from 'json2csv';
import { CsvExportOptions } from '../types';
import { extractData, normalizeColumns } from '../utils/formatters';

export async function exportToCsv(data: any[], options: CsvExportOptions): Promise<void> {
  const columns = normalizeColumns(data, options.columns);
  const formattedData = extractData(data, columns);

  const fields = columns.map(col => col.label || col.key);
  
  const opts = { fields, delimiter: options.delimiter || ',' };
  const parser = new Parser(opts);
  const csv = parser.parse(formattedData);

  const fileName = options.fileName ? `${options.fileName}.csv` : 'report.csv';

  if (typeof window !== 'undefined') {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    // Node.js
    const fs = require('fs');
    fs.writeFileSync(fileName, csv);
  }
}
