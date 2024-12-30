// src/components/InvoiceList.js
import React from 'react';
import InvoiceItem from './InvoiceItem';

function InvoiceList({ invoices, updateInvoice, deleteInvoice }) {
  return (
    <div className="bg-white p-4 rounded shadow max-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Stored Invoices</h2>
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices created yet.</p>
      ) : (
        invoices.map((invoice) => (
          <InvoiceItem
            key={invoice.id}
            invoice={invoice}
            updateInvoice={updateInvoice}
            deleteInvoice={deleteInvoice}
          />
        ))
      )}
    </div>
  );
}

export default InvoiceList;
