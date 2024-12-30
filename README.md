# Invoice Generator

A user-friendly web application for generating invoices, calculating totals with tax, and storing invoices locally in the browser.

## Features

### MVP (Minimum Viable Product)

- **Invoice Creation**
  - Form fields for invoice details including sender, recipient, date, due date, payment terms, PO number, items, notes, and terms.
- **Automatic Calculations**
  - Auto-calculate subtotal, tax, discounts, shipping, and total amount due.
- **Tax Feature**
  - Input a tax percentage to be applied to the subtotal.
- **Local Storage**
  - Store created invoices in the browser's local storage.
  - Retrieve and edit stored invoices.
- **User Interface**
  - Clean and intuitive layout.
  - Responsive design for desktop and mobile.

### Future Enhancements

- Export invoices as PDFs.
- Email invoices directly from the application.
- Customizable invoice templates.
- Search and filter stored invoices.
- Advanced tax options.
- User accounts and cloud backup.
- Multi-currency support.
- Analytics dashboard.
- Recurring invoices.

## Technical Stack

- **Frontend**
  - React.js
  - Tailwind CSS for styling
- **Deployment**
  - GitHub Pages
- **Additional Tools**
  - `uuid` for unique invoice IDs

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed. Download from [Node.js](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/<your-github-username>/invoice-generator.git
   cd invoice-generator
