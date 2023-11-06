import { useAppSelector } from '../../../../redux/hooks';

import styles from './index.module.css';

/**
 * Таймер обратного отсчета
 */
export const Timer = () => {
  const { timer } = useAppSelector((state) => state.memoji);
  return <span className={styles.root}>{timer}</span>;
};
