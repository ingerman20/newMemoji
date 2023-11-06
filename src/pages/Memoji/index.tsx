import { useCallback, useEffect } from 'react';
import {
  addResult,
  closeOpenedCards,
  countDown,
  createNewPairs,
  guessCards,
  resetGame,
  openAllCards,
  closeAllCards,
  addWrongAttempt,
  closeAllModals,
} from './redux/features/gameplay/gameplaySlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isNullOrUndefined } from './utils/helpers';
import { Cards } from './modules/Cards';
import { GameStatus, ResultStatus } from './data/enums';
import { SettingsModal } from './modules/modals/Settings';
import { StatisticsModal } from './modules/modals/Statistics';
import { ResultModal } from './modules/modals/Result';
import { Toolbar } from './modules/Toolbar';
import { Header } from './modules/Header';
import { Layout } from '../../components/Layout';
import { ResultMessage } from './components/ResultMessage';

/**
 * Игра Memoji
 */
const Memoji = () => {
  const dispatch = useAppDispatch();
  const {
    cards,
    firstCardIndex,
    secondCardIndex,
    gameStatus,
    resultStatus,
    pairsCount,
    setName,
    timeForShowCards,
  } = useAppSelector((state) => state.memoji);

  /**
   * Подготовка новой игры
   */
  const initNewGame = useCallback(() => {
    dispatch(closeAllModals());
    dispatch(resetGame());
    dispatch(closeAllCards());
    setTimeout(() => {
      dispatch(createNewPairs());
    }, 500);
    setTimeout(() => dispatch(openAllCards()), 1000);
    setTimeout(() => dispatch(closeAllCards()), timeForShowCards * 1000 + 1000);
  }, [dispatch, timeForShowCards]);

  /**
   * Сравнение карточек
   */
  const compareCards = useCallback(() => {
    if (
      isNullOrUndefined(firstCardIndex) ||
      isNullOrUndefined(secondCardIndex)
    ) {
      return;
    }

    const firstCard = cards.find((card) => card.index === firstCardIndex);
    const secondCard = cards.find((card) => card.index === secondCardIndex);
    if (firstCard?.value === secondCard?.value) {
      dispatch(guessCards());
    } else {
      setTimeout(() => {
        dispatch(closeOpenedCards());
        dispatch(addWrongAttempt());
      }, 1000);
    }
  }, [cards, dispatch, firstCardIndex, secondCardIndex]);

  /**
   * Функция таймера обратного отсчета
   */
  const countDownFunction = useCallback(
    (intervalID: number) => {
      if (gameStatus === GameStatus.PAUSE || gameStatus === GameStatus.STOP) {
        clearInterval(intervalID);
        return;
      }

      dispatch(countDown());
    },
    [dispatch, gameStatus]
  );

  /**
   * Запись статистики
   */
  const addStatitistics = useCallback(() => {
    if (
      resultStatus === ResultStatus.LOSE ||
      resultStatus === ResultStatus.WIN
    ) {
      const timeoutID = setTimeout(() => {
        dispatch(openAllCards());
      }, 1100);
      dispatch(addResult());
      return timeoutID;
    }
  }, [dispatch, resultStatus]);

  // Инициализация игры
  useEffect(() => {
    initNewGame();
  }, [initNewGame, pairsCount, setName]);

  // Сравнение карточек
  useEffect(() => {
    compareCards();
  }, [compareCards]);

  // Запуск таймера
  useEffect(() => {
    let countdownID: number;
    if (gameStatus === GameStatus.PLAY) {
      countdownID = window.setInterval(
        () => countDownFunction(countdownID),
        1000
      );
    }
    return () => {
      clearInterval(countdownID);
    };
  }, [countDownFunction, dispatch, gameStatus]);

  // Запись статистики
  useEffect(() => {
    const timeoutID = addStatitistics();
    return () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    };
  }, [addStatitistics]);

  return (
    <Layout>
      <Header />
      <ResultMessage />
      <Cards cards={cards} />
      <Toolbar initNewGame={initNewGame} />
      <SettingsModal />
      <StatisticsModal />
      <ResultModal />
    </Layout>
  );
};

export default Memoji;
