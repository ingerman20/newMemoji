import { Timer } from '../../components/Timer';

import styles from './index.module.css';

export const Header = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.logo}>Memoji</h1>
      <Timer />
    </div>
  );
};
