import { useId } from 'react';
import styles from './index.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title?: string;
  options: { name: string; title: string }[];
}

export const Select: React.FC<SelectProps> = ({ ...props }) => {
  const { title, options, ...rest } = props;
  const id = useId();

  return (
    <div className={styles.root}>
      <label htmlFor={id} className={styles.label}>
        {title}
      </label>
      <select {...rest} id={id} className={styles.select}>
        {options.map((item, index) => (
          <option key={`option-${index}`} value={item.name}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};
