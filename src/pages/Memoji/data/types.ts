import { ResultStatus, SetTypes } from './enums';

export type Card = {
  /** Номер карточки */
  index: number;
  /** Картинка на карточке */
  value: string;
  /** Является ли карточка отгаданной */
  isFinished: boolean;
  /** Является ли карточка открытой */
  isOpened: boolean;
};

export type CardSet = {
  name: SetTypes;
  title: string;
  set: string[];
};

export type Result = {
  time: number;
  defaultTime: number;
  resultStatus: ResultStatus;
  setName: SetTypes;
  pairsCount: number;
  cardsResolved: number;
  wrongAttempts: number;
};
