import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../redux/hooks';
import { ResultStatus } from '../../data/enums';
import styles from './index.module.css';

export const ResultMessage = () => {
  const { resultStatus } = useAppSelector((state) => state.memoji);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeoutID: number;
    if (
      resultStatus === ResultStatus.WIN ||
      resultStatus === ResultStatus.LOSE
    ) {
      setShowMessage(true);
      timeoutID = window.setTimeout(() => setShowMessage(false), 5000);
    }
    return () => {
      clearTimeout(timeoutID);
    };
  }, [resultStatus]);

  if (resultStatus === ResultStatus.WIN && showMessage) {
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>Победа!</h3>
      </div>
    );
  }

  if (resultStatus === ResultStatus.LOSE && showMessage) {
    return (
      <div className={styles.root}>
        <h3 className={styles.title}>Время вышло!</h3>
      </div>
    );
  }

  return null;
};
