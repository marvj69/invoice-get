// src/components/InvoiceItem.js
import React, { useState } from 'react';

function InvoiceItem({ invoice, updateInvoice, deleteInvoice }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvoice, setEditedInvoice] = useState(invoice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice({ ...editedInvoice, [name]: value });
  };

  const handleSave = () => {
    updateInvoice(editedInvoice);
    setIsEditing(false);
  };

  return (
    <div className="border rounded p-3 mb-3">
      {isEditing ? (
        <div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Invoice Number</label>
            <input
              type="text"
              name="invoiceNumber"
              value={editedInvoice.invoiceNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          {/* Add more editable fields as needed */}
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Invoice #: </strong>{invoice.invoiceNumber}</p>
          <p><strong>Sender: </strong>{invoice.sender}</p>
          <p><strong>Recipient: </strong>{invoice.recipient}</p>
          <p><strong>Date: </strong>{invoice.date}</p>
          <p><strong>Due Date: </strong>{invoice.dueDate}</p>
          <p><strong>Total: </strong>${Number(invoice.total).toFixed(2)}</p>
          <div className="mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteInvoice(invoice.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceItem;
