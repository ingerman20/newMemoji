import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Card, Result } from '../../../data/types';
import { cardsSets } from '../../../data/options';
import { GameStatus, ResultStatus, SetTypes } from '../../../data/enums';
import { shuffleArray } from '../../../utils/helpers';

export interface MemojiState {
  setName: SetTypes;
  pairsCount: number;
  timer: number;
  timeForShowCards: number;
  cards: Card[];
  firstCardIndex: number | null;
  secondCardIndex: number | null;
  resultStatus: ResultStatus;
  gameStatus: GameStatus;
  settingsModal: boolean;
  statisticsModal: boolean;
  resultModal: boolean;
  defaultTime: number;
  wrongAttempts: number;
  results: Result[];
}

const initialState: MemojiState = {
  setName: SetTypes.ANIMALS,
  pairsCount: 6,
  timeForShowCards: 3,
  timer: 30,
  cards: [],
  firstCardIndex: null,
  secondCardIndex: null,
  resultStatus: ResultStatus.NONE,
  settingsModal: false,
  statisticsModal: false,
  resultModal: false,
  gameStatus: GameStatus.NONE,
  defaultTime: 30,
  results: [],
  wrongAttempts: 0,
};

export const memojiSlice = createSlice({
  name: 'memoji',
  initialState,
  reducers: {
    setPairsCount: (state, action: PayloadAction<number>): MemojiState => {
      return { ...state, pairsCount: action.payload };
    },

    setNewTime: (state, action: PayloadAction<number>): MemojiState => {
      const newTime = action.payload;

      return {
        ...state,
        timer: newTime,
        defaultTime: newTime,
      };
    },

    setTimeForShowCards: (
      state,
      action: PayloadAction<number>
    ): MemojiState => {
      const newTime = action.payload;

      return {
        ...state,
        timeForShowCards: newTime,
      };
    },

    setNewSetName: (state, action: PayloadAction<SetTypes>): MemojiState => {
      return { ...state, setName: action.payload };
    },

    createNewPairs: (state): MemojiState => {
      const selectedCardSet = cardsSets.find(
        (set) => set.name === state.setName
      )!;
      const shuffledCollection = shuffleArray(selectedCardSet.set);
      const uniqueValues = shuffledCollection.slice(0, state.pairsCount);
      const pairs = [...uniqueValues, ...uniqueValues];
      const shuffledPairs = shuffleArray(pairs);
      const cards: Card[] = shuffledPairs.map((item, index) => ({
        index,
        value: item,
        isFinished: false,
        isOpened: false,
      }));
      return { ...state, cards };
    },

    setFirstCard: (state, action: PayloadAction<number>) => {
      const newCards = state.cards.map((item, index) => {
        if (index === action.payload) {
          return { ...item, isOpened: true };
        }

        return item;
      });

      return { ...state, firstCardIndex: action.payload, cards: newCards };
    },

    setSecondCard: (state, action: PayloadAction<number>): MemojiState => {
      const newCards = state.cards.map((item, index) => {
        if (index === action.payload) {
          return { ...item, isOpened: true };
        }

        return item;
      });

      return { ...state, secondCardIndex: action.payload, cards: newCards };
    },

    openAllCards: (state): MemojiState => {
      const { cards } = state;
      const openCards = cards.map((card) => ({ ...card, isOpened: true }));
      return { ...state, cards: [...openCards] };
    },

    closeAllCards: (state): MemojiState => {
      const { cards } = state;
      const closedCards = cards.map((card) => ({ ...card, isOpened: false }));
      return { ...state, cards: closedCards };
    },

    closeOpenedCards: (state): MemojiState => {
      const { firstCardIndex, secondCardIndex } = state;
      const newCards = state.cards.map((item) => {
        if (item.index === firstCardIndex || item.index === secondCardIndex) {
          return { ...item, isOpened: false };
        }

        return item;
      });

      return {
        ...state,
        firstCardIndex: null,
        secondCardIndex: null,
        cards: newCards,
      };
    },

    guessCards: (state): MemojiState => {
      const { firstCardIndex, secondCardIndex } = state;
      const newCards = state.cards.map((card) => {
        if (card.index === firstCardIndex || card.index === secondCardIndex) {
          return { ...card, isFinished: true };
        }
        return card;
      });

      return {
        ...state,
        firstCardIndex: null,
        secondCardIndex: null,
        cards: newCards,
      };
    },

    countDown: (state): MemojiState => {
      const { timer, cards } = state;
      const hasUnresolvedCars = cards.some((card) => !card.isFinished);
      if (!hasUnresolvedCars) {
        return {
          ...state,
          gameStatus: GameStatus.STOP,
          resultStatus: ResultStatus.WIN,
        };
      }

      if (timer === 0 && hasUnresolvedCars) {
        return {
          ...state,
          gameStatus: GameStatus.STOP,
          resultStatus: ResultStatus.LOSE,
        };
      }

      const newTime = timer - 1;
      return { ...state, timer: newTime };
    },

    startGame: (state): MemojiState => {
      return { ...state, gameStatus: GameStatus.PLAY };
    },

    pauseGame: (state): MemojiState => {
      return { ...state, gameStatus: GameStatus.PAUSE };
    },

    resetGame: (state): MemojiState => {
      return {
        ...state,
        gameStatus: GameStatus.NONE,
        resultStatus: ResultStatus.NONE,
        timer: state.defaultTime,
        wrongAttempts: 0,
      };
    },

    openSettingsModal: (state): MemojiState => {
      const { gameStatus } = state;

      if (gameStatus === GameStatus.NONE) {
        return { ...state, settingsModal: true };
      }

      return { ...state, settingsModal: true, gameStatus: GameStatus.PAUSE };
    },

    addWrongAttempt: (state): MemojiState => {
      return { ...state, wrongAttempts: state.wrongAttempts + 1 };
    },

    closeSettingsModal: (state): MemojiState => {
      const { gameStatus } = state;

      if (gameStatus === GameStatus.NONE) {
        return { ...state, settingsModal: false };
      }

      return { ...state, settingsModal: false, gameStatus: GameStatus.PLAY };
    },

    openStatisticsModal: (state): MemojiState => {
      const { gameStatus } = state;

      if (gameStatus === GameStatus.NONE) {
        return { ...state, statisticsModal: true };
      }

      return { ...state, statisticsModal: true, gameStatus: GameStatus.PAUSE };
    },

    closeStatisticsModal: (state): MemojiState => {
      const { gameStatus } = state;

      if (gameStatus === GameStatus.NONE) {
        return { ...state, statisticsModal: false };
      }

      return { ...state, statisticsModal: false, gameStatus: GameStatus.PLAY };
    },

    openResultModal: (state): MemojiState => {
      return { ...state, resultModal: true };
    },

    closeResultModal: (state): MemojiState => {
      return { ...state, resultModal: false };
    },

    closeAllModals: (state): MemojiState => {
      return {
        ...state,
        resultModal: false,
        settingsModal: false,
        statisticsModal: false,
      };
    },

    clearResults: (state): MemojiState => {
      return { ...state, results: [] };
    },

    addResult: (state): MemojiState => {
      const {
        timer,
        resultStatus,
        setName,
        pairsCount,
        defaultTime,
        wrongAttempts,
      } = state;

      return {
        ...state,
        results: [
          ...state.results,
          {
            time: state.defaultTime - timer,
            defaultTime,
            resultStatus,
            setName,
            pairsCount,
            cardsResolved: state.cards.filter((item) => item.isFinished).length,
            wrongAttempts,
          },
        ],
      };
    },
  },
});

export const {
  setPairsCount,
  createNewPairs,
  setFirstCard,
  setSecondCard,
  openAllCards,
  closeAllCards,
  closeOpenedCards,
  guessCards,
  countDown,
  startGame,
  pauseGame,
  resetGame,
  openSettingsModal,
  closeSettingsModal,
  openStatisticsModal,
  closeStatisticsModal,
  openResultModal,
  closeResultModal,
  closeAllModals,
  setNewTime,
  setNewSetName,
  clearResults,
  addResult,
  addWrongAttempt,
  setTimeForShowCards,
} = memojiSlice.actions;

export default memojiSlice.reducer;
