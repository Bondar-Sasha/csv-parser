import XLSX from 'xlsx'
import fs from 'fs'

// 1. Создаем данные для CSV
const data = [
  ["Name", "Age", "Email", "Position"],
  ["John Doe", 32, "john@example.com", "Developer"],
  ["Jane Smith", 28, "jane@example.com", "Designer"],
  ["Bob Johnson", 45, "bob@example.com", "Manager"]
];

// 2. Создаем рабочую книгу и лист
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet(data);

// 3. Добавляем лист в книгу
XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

// 4. Генерируем CSV (вместо Excel)
const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

// 5. Сохраняем в файл
fs.writeFileSync('employees.csv', csvOutput);

console.log('CSV файл успешно создан: employees.csv');