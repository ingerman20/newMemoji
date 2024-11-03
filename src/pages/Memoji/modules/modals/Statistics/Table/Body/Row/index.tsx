import { ResultStatus, SetTypes } from '../../../../../../data/enums';
import { Result } from '../../../../../../data/types';

export const StatisticsModalRow = ({ result }: { result: Result }) => {
  const {
    cardsResolved,
    defaultTime,
    pairsCount,
    resultStatus,
    setName,
    time,
    wrongAttempts,
  } = result;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(50px, 200px))',
        wordWrap: 'break-word',
        gap: '20px',
        margin: '20px',
      }}
    >
      <span>{resultStatus === ResultStatus.WIN ? 'Выигрыш' : 'Проигрыш'}</span>
      <span>
        {cardsResolved} / {pairsCount * 2}
      </span>
      <span>
        {time} / {defaultTime}
      </span>
      <span>{wrongAttempts}</span>
      <span>
        {(setName === SetTypes.ANIMALS && 'Животные') ||
          (setName === SetTypes.FLAGS && 'Флаги') ||
          (setName === SetTypes.FINGERS && 'Жесты')}
      </span>
    </div>
  );
};
