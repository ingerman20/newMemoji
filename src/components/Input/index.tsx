import { useId } from 'react';
import styles from './index.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  error?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  const { title, error, ...rest } = props;
  const id = useId();

  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {title}
      </label>
      <input {...rest} id={id} className={styles.input} />
      <span className={styles.error}>{error}</span>
    </div>
  );
};
