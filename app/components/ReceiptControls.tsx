import styles from './ReceiptPreview.module.css';

interface ControlsProps {
    onClear: () => void;
    onCancel: () => void;
    onDownload: () => void;
  }
  
  export const ReceiptControls: React.FC<ControlsProps> = ({ onClear, onCancel, onDownload }) => (
    <div className={styles.buttonRow}>
      <button onClick={onClear} className={styles.button}>Clear Drawing</button>
      <button onClick={onCancel} className={styles.button}>Cancel</button>
      <button onClick={onDownload} className={styles.button}>Download PDF</button>
    </div>
  );
  