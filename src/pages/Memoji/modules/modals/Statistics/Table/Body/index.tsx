import { useAppSelector } from '../../../../../../../redux/hooks';
import { StatisticsModalRow } from './Row';

import styles from './index.module.css';

export const StatisticsModalBody = () => {
  const { results } = useAppSelector((state) => state.memoji);

  return (
    <div className={styles.root}>
      {results.map((item, index) => {
        return <StatisticsModalRow key={`result-${index}`} result={item} />;
      })}
    </div>
  );
};
