import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Exports data to CSV format
 */
export const exportToCSV = (data, fileName = 'Dashboard_Report') => {
  const rows = Array.isArray(data) ? data : [];
  if (rows.length === 0) {
    const blob = new Blob(['No data to export\n'], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    return;
  }

  const headers = Object.keys(rows[0] ?? {});
  const escapeCell = (value) => {
    const raw = value == null ? '' : String(value);
    const escaped = raw.replaceAll('"', '""');
    return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
  };

  const csv = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => headers.map((h) => escapeCell(row?.[h])).join(',')),
  ].join('\n');

  // Include UTF-8 BOM for better Excel compatibility
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

/**
 * Exports data to Excel format
 */
export const exportToExcel = (data, fileName = 'Dashboard_Report') => {
  const rows = Array.isArray(data) ? data : [];
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

/**
 * Exports data to PDF format
 */
export const exportToPDF = (data, fileName = 'Dashboard_Report') => {
  const rows = Array.isArray(data) ? data : [];
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text("SugarPanel Dashboard Report", 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  if (rows.length === 0) {
    doc.setFontSize(12);
    doc.setTextColor(60);
    doc.text('No data available to export.', 14, 44);
    doc.save(`${fileName}.pdf`);
    return;
  }

  const headers = [Object.keys(rows[0] ?? {})];
  const body = rows.map((obj) => Object.values(obj ?? {}));

  doc.autoTable({
    head: headers,
    body,
    startY: 40,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] }
  });

  doc.save(`${fileName}.pdf`);
};
