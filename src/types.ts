export type ExportFormat = 'pdf' | 'excel' | 'csv' | 'print';

export interface ColumnDef {
  key: string;
  label?: string;
}

export interface BaseExportOptions {
  fileName?: string;
  columns?: (string | ColumnDef)[];
}

export interface PdfExportOptions extends BaseExportOptions {
  format: 'pdf';
  styles?: {
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: Record<string, any>;
    bodyStyles?: Record<string, any>;
  };
}

export interface ExcelExportOptions extends BaseExportOptions {
  format: 'excel';
  styles?: {
    headerBackgroundColor?: string;
    headerFontColor?: string;
  };
}

export interface CsvExportOptions extends BaseExportOptions {
  format: 'csv';
  delimiter?: string;
}

export interface PrintExportOptions extends BaseExportOptions {
  format: 'print';
  title?: string;
  styles?: {
    tableClass?: string;
  };
}

export type ExportOptions =
  | PdfExportOptions
  | ExcelExportOptions
  | CsvExportOptions
  | PrintExportOptions;
