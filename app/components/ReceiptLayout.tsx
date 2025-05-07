import React from 'react';
import styles from './ReceiptPreview.module.css';

interface LayoutProps {
  name: string;
  amount: string;
  billNo: string;
  qrCodeUrl: string;
}

const ReceiptLayout: React.FC<LayoutProps> = ({ name, amount, billNo, qrCodeUrl }) => (
  <div className={styles.receipt}>
    <h2 className={styles.receiptHeader}>ONLINE RECEIPT</h2>

    <div className={styles.flexSpace}>
      <div>
        <strong>East Repair Inc.</strong><br />
        1912 Harvest Lane<br />
        New York, NY 12210
      </div>
      <div className={styles.textRight}>
        <div><strong>RECEIPT #</strong> {billNo}</div>
        <div><strong>RECEIPT DATE</strong> {new Date().toLocaleDateString()}</div>
        <div><strong>P.O.#</strong> 2312/2019</div>
        <div><strong>DUE DATE</strong> 26/02/2019</div>
      </div>
    </div>

    <div className={`${styles.flexSpace} ${styles.mt30}`}>
      <div><strong>BILL TO</strong><br />{name}<br />2 Court Square<br />New York, NY 12210</div>
      <div><strong>SHIP TO</strong><br />{name}<br />3787 Pineview Drive<br />Cambridge, MA 12210</div>
    </div>

    <h2 className={styles.amount}>${parseFloat(amount || '0').toFixed(2)}</h2>

    <table className={styles.table}>
      <thead>
        <tr><th>QTY</th><th>DESCRIPTION</th><th>UNIT PRICE</th><th>AMOUNT</th></tr>
      </thead>
      <tbody>
        <tr><td>1</td><td>Front and rear brake cables</td><td>$100.00</td><td>$100.00</td></tr>
        <tr><td>2</td><td>New set of pedal arms</td><td>$15.00</td><td>$30.00</td></tr>
        <tr><td>3</td><td>Labor 3hrs</td><td>$5.00</td><td>$15.00</td></tr>
      </tbody>
    </table>

    <div className={`${styles.textRight} ${styles.mt10}`}>
      <div>Subtotal $145.00</div>
      <div>Sales Tax 6.25% $9.06</div>
    </div>

    <div className={styles.mt20}>
      <strong>PAYMENT INSTRUCTION</strong><br />
      Paypal email: receipt@gmail.com<br />
      Bank transfer Routing (ABC): 0560120214
    </div>

    <div className={`${styles.mt20} ${styles.smallFont}`}>
      <strong>TERMS & CONDITIONS</strong><br />
      Payment is due within 15 days.<br />
      Please make checks payable to: East Repair Inc.
    </div>

    <div className={`${styles.textRight} ${styles.mt20}`}>
      <strong>Signature</strong><br />
      <div className={styles.italic}>Draw your signature below</div>
    </div>

    <div className={styles.qrWrap}>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className={styles.qrCode} />}
    </div>
  </div>
);

export default ReceiptLayout;
