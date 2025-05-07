'use client';

import React, { useState } from 'react';
import ReceiptPreview from './ReceiptPreview';

const BillForm: React.FC = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [billNo, setBillNo] = useState(`US-${Date.now().toString().slice(-6)}`);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }} style={{ margin: '20px', maxWidth: '400px' }}>
        <h2>Generate Receipt</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" required /><br /><br />
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required /><br /><br />
        <button type="submit">Preview</button>
      </form>

      {showPreview && (
        <ReceiptPreview
          name={name}
          amount={amount}
          billNo={billNo}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

export default BillForm;
