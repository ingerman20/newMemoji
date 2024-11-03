import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { Card } from '../../components/Card';
import { Card as CardType } from '../../data/types';
import {
  setFirstCard,
  setSecondCard,
  startGame,
} from '../../redux/features/gameplay/gameplaySlice';
import { isNullOrUndefined } from '../../utils/helpers';
import { GameStatus, ResultStatus } from '../../data/enums';
import { useCardsInfo } from './hooks';
import { Orientation } from './settings';

import styles from './index.module.css';

export const Cards = ({ cards }: { cards: CardType[] }) => {
  const dispatch = useAppDispatch();
  const { firstCardIndex, secondCardIndex, gameStatus, resultStatus } =
    useAppSelector((state) => state.memoji);
  const { cardsContainer, countOfColumns, countOfRows, orientation } =
    useCardsInfo();

  const handleClick = useCallback(
    (index: number) => {
      if (
        resultStatus === ResultStatus.LOSE ||
        resultStatus === ResultStatus.WIN
      ) {
        return;
      }

      if (gameStatus === GameStatus.NONE) {
        dispatch(startGame());
      }

      if (isNullOrUndefined(firstCardIndex)) {
        dispatch(setFirstCard(index));
        return;
      }

      if (isNullOrUndefined(secondCardIndex)) {
        dispatch(setSecondCard(index));
        return;
      }
    },
    [dispatch, firstCardIndex, gameStatus, resultStatus, secondCardIndex]
  );

  return (
    <div
      className={styles.root}
      style={{
        height: cardsContainer.height,
        width: cardsContainer.width,
        gridTemplateColumns:
          orientation === Orientation.ALBUM
            ? `repeat(${countOfColumns}, 1fr)`
            : `repeat(${countOfRows}, 1fr)`,
        gridTemplateRows:
          orientation === Orientation.ALBUM
            ? `repeat(${countOfRows}, 1fr)`
            : `repeat(${countOfColumns}, 1fr)`,
      }}
    >
      {cards.map((card, index) => (
        <Card key={`card-${index}`} data={card} onClick={handleClick} />
      ))}
    </div>
  );
};
