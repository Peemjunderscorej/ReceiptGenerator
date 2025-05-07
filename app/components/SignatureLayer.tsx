import React from 'react';
import SignaturePad from 'react-signature-canvas';
import styles from './ReceiptPreview.module.css';

type Props = {
  height: number;
};

const SignatureLayer = React.forwardRef<SignaturePad, Props>(({ height }, ref) => (
  <SignaturePad
    ref={ref}
    canvasProps={{
      className: styles.signatureCanvas,
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
        zIndex: 2,
        width: '100%',
        height: `${height}px`,
        pointerEvents: 'auto',
      },
    }}
  />
));

export default SignatureLayer;
