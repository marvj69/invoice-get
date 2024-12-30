// src/App.js
import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';

function App() {
  const [invoices, setInvoices] = useState([]);

  // Load invoices from localStorage on initial render
  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  // Update localStorage whenever invoices change
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    setInvoices(updatedInvoices);
  };

  const deleteInvoice = (id) => {
    const filteredInvoices = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(filteredInvoices);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice Generator</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-2">
          <InvoiceForm addInvoice={addInvoice} />
        </div>
        <div className="md:w-1/2 p-2">
          <InvoiceList
            invoices={invoices}
            updateInvoice={updateInvoice}
            deleteInvoice={deleteInvoice}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
