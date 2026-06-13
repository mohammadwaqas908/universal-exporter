import { exportData } from '../src';

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'User' },
];

async function run() {
  try {
    console.log('Exporting to PDF...');
    await exportData(data, {
      format: 'pdf',
      fileName: 'users-report',
      columns: [
        { key: 'id', label: 'User ID' },
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email Address' },
      ],
    });

    console.log('Exporting to Excel...');
    await exportData(data, {
      format: 'excel',
      fileName: 'users-report',
      styles: {
        headerBackgroundColor: '#007bff',
        headerFontColor: '#ffffff',
      },
    });

    console.log('Exporting to CSV...');
    await exportData(data, {
      format: 'csv',
      fileName: 'users-report',
    });

    console.log('Exporting to Print (HTML)...');
    const html = await exportData(data, {
      format: 'print',
      title: 'Users Report',
    });
    console.log('Generated HTML length:', html.length);

    console.log('All exports completed successfully!');
  } catch (error) {
    console.error('Error during export:', error);
  }
}

run();
