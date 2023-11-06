import classNames from 'classnames';
import { Card as CardType } from '../../data/types';
import { useAppSelector } from '../../../../redux/hooks';
import { ResultStatus } from '../../data/enums';

import styles from './index.module.css';

export const Card = ({
  data,
  onClick,
}: {
  data: CardType;
  onClick: (index: number) => void;
}) => {
  const { resultStatus } = useAppSelector((state) => state.memoji);

  return (
    <div
      className={classNames(styles.card, {
        [styles.cardOpened]: data.isOpened,
      })}
      onClick={() => (!data.isOpened ? onClick(data.index) : undefined)}
    >
      <div
        className={classNames(
          styles.cardSide,
          styles.frontSide,
          styles.cardDefault,
          {
            [styles.cardWin]:
              data.isFinished &&
              (resultStatus === ResultStatus.LOSE ||
                resultStatus === ResultStatus.WIN),
          }
        )}
      />
      <div
        className={classNames(styles.cardSide, styles.backSide, {
          [styles.cardWin]:
            data.isFinished &&
            (resultStatus === ResultStatus.LOSE ||
              resultStatus === ResultStatus.WIN),
        })}
      >
        {data.value}
      </div>
    </div>
  );
};
