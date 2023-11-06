import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import styles from './index.module.css';

const ModalUI = ({
  children,
  onClose,
  style,
}: {
  children: React.ReactNode;
  onClose: () => void;
  style?: React.CSSProperties | undefined;
}) => {
  return (
    <>
      <div className={styles.background} />
      <div className={styles.frame} style={style}>
        <button onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export const Modal = ({
  children,
  onClose,
  style,
}: {
  children: React.ReactNode;
  onClose: () => void;
  style?: React.CSSProperties | undefined;
}) => {
  const container = document.getElementById('modal')!;
  return createPortal(
    <ModalUI onClose={onClose} style={style}>
      {children}
    </ModalUI>,
    container
  );
};
