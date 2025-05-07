'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import SignaturePad from 'react-signature-canvas';
import styles from './ReceiptPreview.module.css';

import  ReceiptLayout  from './ReceiptLayout';
import { ReceiptControls } from './ReceiptControls';
import SignatureLayer from './SignatureLayer';

interface Props {
  name: string;
  amount: string;
  billNo: string;
  onClose: () => void;
}

const ReceiptPreview: React.FC<Props> = ({ name, amount, billNo, onClose }) => {
    const receiptRef = useRef<HTMLDivElement>(null);
    const signaturePadRef = useRef<SignaturePad>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [padHeight, setPadHeight] = useState(1100);
  
    useEffect(() => {
      QRCode.toDataURL(`Receipt#${billNo} | Name: ${name} | Amount: $${amount}`).then(setQrCodeUrl);
    }, [name, billNo, amount]);
  
    useLayoutEffect(() => {
      if (receiptRef.current) {
        setPadHeight(receiptRef.current.scrollHeight);
      }
    }, [qrCodeUrl, name, amount]);
  
    useLayoutEffect(() => {
      const canvas = signaturePadRef.current?.getCanvas();
      const signaturePad = signaturePadRef.current;
      if (canvas && signaturePad) {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const data = signaturePad.toData();
  
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        ctx?.scale(dpr, dpr);
  
        signaturePad.clear();
        signaturePad.fromData(data);
      }
    }, [padHeight]);
  
    const handleDownload = async () => {
      if (!receiptRef.current) return;
      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('receipt.pdf');
      onClose();
    };
  
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2 className={styles.heading}>Receipt Preview</h2>
          <div className={styles.scrollContainer}>
            <div ref={receiptRef} className={styles.receiptWrapper}>
              <ReceiptLayout name={name} amount={amount} billNo={billNo} qrCodeUrl={qrCodeUrl} />
              <SignatureLayer ref={signaturePadRef} height={padHeight} />
            </div>
          </div>
          <ReceiptControls
            onClear={() => signaturePadRef.current?.clear()}
            onCancel={onClose}
            onDownload={handleDownload}
          />
        </div>
      </div>
    );
  };

export default ReceiptPreview;