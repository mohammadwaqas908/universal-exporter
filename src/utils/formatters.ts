import { ColumnDef } from '../types';

export function normalizeColumns(data: any[], optionsColumns?: (string | ColumnDef)[]): ColumnDef[] {
  if (optionsColumns && optionsColumns.length > 0) {
    return optionsColumns.map(col => {
      if (typeof col === 'string') {
        return { key: col, label: col };
      }
      return { key: col.key, label: col.label || col.key };
    });
  }

  if (data.length > 0) {
    return Object.keys(data[0]).map(key => ({ key, label: key }));
  }

  return [];
}

export function extractData(data: any[], columns: ColumnDef[]): any[] {
  return data.map(row => {
    const newRow: any = {};
    columns.forEach(col => {
      newRow[col.label || col.key] = row[col.key];
    });
    return newRow;
  });
}
