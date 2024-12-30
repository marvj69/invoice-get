// src/components/InvoiceForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function InvoiceForm({ addInvoice }) {
  const initialItem = { description: '', quantity: 1, rate: 0, amount: 0 };
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    sender: '',
    recipient: '',
    shipTo: '',
    date: '',
    dueDate: '',
    paymentTerms: '',
    poNumber: '',
    items: [initialItem],
    notes: '',
    terms: '',
    tax: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    balanceDue: 0,
    amountPaid: 0,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  // Handle item changes
  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    const updatedItem = { ...items[index], [name]: value };

    // Calculate amount
    const quantity = parseFloat(updatedItem.quantity) || 0;
    const rate = parseFloat(updatedItem.rate) || 0;
    updatedItem.amount = quantity * rate;

    items[index] = updatedItem;
    setInvoiceData({ ...invoiceData, items, total: calculateTotal(items) });
  };

  // Add new item
  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { ...initialItem }],
    });
  };

  // Remove item
  const removeItem = (index) => {
    const items = [...invoiceData.items];
    items.splice(index, 1);
    setInvoiceData({ ...invoiceData, items, total: calculateTotal(items) });
  };

  // Calculate subtotal, tax, discount, shipping, and total
  const calculateTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + Number(item.amount), 0);
    const taxAmount = (subtotal * Number(invoiceData.tax)) / 100;
    const total = subtotal + taxAmount - Number(invoiceData.discount) + Number(invoiceData.shipping);
    return total;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = { ...invoiceData, id: uuidv4() };
    addInvoice(newInvoice);
    setInvoiceData({
      invoiceNumber: '',
      sender: '',
      recipient: '',
      shipTo: '',
      date: '',
      dueDate: '',
      paymentTerms: '',
      poNumber: '',
      items: [{ ...initialItem }],
      notes: '',
      terms: '',
      tax: 0,
      discount: 0,
      shipping: 0,
      total: 0,
      balanceDue: 0,
      amountPaid: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      
      {/* Invoice Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Invoice Number</label>
        <input
          type="text"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Sender Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Sender</label>
        <input
          type="text"
          name="sender"
          value={invoiceData.sender}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Who is this from?"
        />
      </div>

      {/* Recipient Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Bill To</label>
        <input
          type="text"
          name="recipient"
          value={invoiceData.recipient}
          onChange={handleChange}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Bill To"
        />
      </div>

      {/* Ship To Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Ship To</label>
        <input
          type="text"
          name="shipTo"
          value={invoiceData.shipTo}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Ship To (optional)"
        />
      </div>

      {/* Date and Due Date */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={invoiceData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={invoiceData.dueDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      {/* Payment Terms and PO Number */}
      <div className="flex space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Payment Terms</label>
          <input
            type="text"
            name="paymentTerms"
            value={invoiceData.paymentTerms}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="e.g., Net 30"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">PO Number</label>
          <input
            type="text"
            name="poNumber"
            value={invoiceData.poNumber}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="PO Number (optional)"
          />
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Items</label>
        {invoiceData.items.map((item, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              required
              className="mt-1 block w-1/3 border-gray-300 rounded-md shadow-sm"
              placeholder="Description"
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              required
              min="1"
              className="mt-1 block w-1/4 border-gray-300 rounded-md shadow-sm"
              placeholder="Quantity"
            />
            <input
              type="number"
              name="rate"
              value={item.rate}
              onChange={(e) => handleItemChange(index, e)}
              required
              min="0"
              step="0.01"
              className="mt-1 block w-1/4 border-gray-300 rounded-md shadow-sm"
              placeholder="Rate"
            />
            <input
              type="number"
              name="amount"
              value={item.amount}
              readOnly
              className="mt-1 block w-1/4 border-gray-300 rounded-md shadow-sm bg-gray-100"
              placeholder="Amount"
            />
            {invoiceData.items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mt-1 text-red-500 hover:text-red-700"
                title="Remove Item"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Tax, Discount, Shipping */}
      <div className="mb-4">
        <div className="flex space-x-4">
          <div className="w-1/3">
            <label className="block text-sm font-medium">Tax (%)</label>
            <input
              type="number"
              name="tax"
              value={invoiceData.tax}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium">Discount</label>
            <input
              type="number"
              name="discount"
              value={invoiceData.discount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="w-1/3">
            <label className="block text-sm font-medium">Shipping</label>
            <input
              type="number"
              name="shipping"
              value={invoiceData.shipping}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Notes</label>
        <textarea
          name="notes"
          value={invoiceData.notes}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Additional notes (optional)"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Terms</label>
        <textarea
          name="terms"
          value={invoiceData.terms}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Payment terms and conditions"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Invoice
      </button>
    </form>
  );
}

export default InvoiceForm;
