import styles from './index.module.css';

export const StatisticsTableHeader = () => {
  return (
    <div className={styles.root}>
      <span>Итог</span>
      <span>Раскрыто</span>
      <span>Время</span>
      <span>Ошибок</span>
      <span>Карточки</span>
    </div>
  );
};
