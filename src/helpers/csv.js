import { saveFile } from './browser';

const escapseHeaderCell = cell => {
    if (!cell) {
        return '';
    }
    cell = (typeof cell === 'object'
        ? cell.toString()
        : new String(cell)
    ).replace(/_|-/g, ' ');
    return escapseCell(cell.charAt(0).toUpperCase() + cell.slice(1));
};
const escapseCell = cell => {
    if (!cell) {
        return '';
    }
    cell = typeof cell === 'object' ? cell.toString() : new String(cell);
    return cell.replace(/ /g, '').match(/[\s,"]/)
        ? '"' + cell.replace(/"/g, '""') + '"'
        : cell;
};
const generateRow = row => {
    let columns = '';
    for (let index in row) {
        columns += escapseCell(row[index]) + ',';
    }
    return columns.substr(0, columns.length - 1) + '\n';
};
const generateDatatableRow = (header, row) => {
    let columns = '';
    for (let index in header) {
        columns += escapseCell(row[header[index].value]) + ',';
    }
    return columns.substr(0, columns.length - 1) + '\n';
};
const generateRows = rows => {
    let csvRows = '';
    for (let index in rows) {
        csvRows += generateRow(rows[index]);
    }
    return csvRows;
};
const generateDatatableRows = (header, rows) => {
    let csvRows = '';
    for (let index in rows) {
        csvRows += generateDatatableRow(header, rows[index]);
    }
    return csvRows;
};
const generateHeaderRow = header => {
    let column = '';
    if (header instanceof Array) {
        for (let index in header) {
            column += escapseHeaderCell(header[index]) + ',';
        }
    } else {
        for (let index in header) {
            column += escapseHeaderCell(index) + ',';
        }
    }
    return column.substr(0, column.length - 1) + '\n';
};
const generateDatatableHeaderRow = header => {
    let column = '';
    for (let index in header) {
        column += escapseHeaderCell(header[index].text) + ',';
    }
    return column.substr(0, column.length - 1) + '\n';
};
export const toCSV = rows => generateHeaderRow(rows[0]) + generateRows(rows);
export const toCSVFromDataTable = (header, rows) =>
    generateDatatableHeaderRow(header) + generateDatatableRows(header, rows);
export const downloadCSV = (data, filename) => {
    saveFile(data, filename, '.csv', 'text/csv', 'utf-8');
};