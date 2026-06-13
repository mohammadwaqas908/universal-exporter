# Universal Exporter

An open-source, production-ready NPM package that provides a unified, elegant solution for exporting data across multiple formats: **PDF**, **Excel**, **CSV**, and **Print**. Built with TypeScript, it seamlessly supports both Node.js backend usage and modern browser environments.

![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

## Requirements

- Node.js >= 14
- If using in the browser, a bundler like Webpack, Vite, or Rollup is recommended.

## Installation

```bash
npm install universal-exporter
```

## Usage

The package provides a single clean API `exportData(data, options)`:

```typescript
import { exportData } from 'universal-exporter';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// Export to PDF
exportData(users, { 
  format: 'pdf', 
  fileName: 'users-report',
  columns: [
    { key: 'id', label: 'User ID' },
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'Email Address' }
  ]
});

// Export to Excel
exportData(users, { format: 'excel', fileName: 'users-report' });

// Export to CSV
exportData(users, { format: 'csv', fileName: 'users-report' });

// Export to Print (HTML)
exportData(users, { format: 'print', title: 'User List' });
```

## Support & Security

### Support

- **Issues:** [Open an issue in GitHub](https://github.com/mohammadwaqas908/universal-exporter/issues)

- **Security:** If you discover any issues, please email `m.waqas7375@gmail.com`.

## Credits

- [Muhammad Waqas](https://github.com/mohammadwaqas908)

## Contributing

This project is entirely **open-source**, and we welcome contributions from the community! Whether it's adding new export formats, improving styles, or fixing bugs, feel free to fork the repository and submit a pull request.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
