import {
  ANIMALS_COLLECTION,
  FINGERS_COLLECTION,
  FLAGS_COLLECTION,
} from './collections';
import { SetTypes } from './enums';
import { CardSet } from './types';

export const cardsSets: CardSet[] = [
  {
    name: SetTypes.ANIMALS,
    title: 'Животные',
    set: ANIMALS_COLLECTION,
  },
  {
    name: SetTypes.FINGERS,
    title: 'Жесты',
    set: FINGERS_COLLECTION,
  },
  {
    name: SetTypes.FLAGS,
    title: 'Флаги',
    set: FLAGS_COLLECTION,
  },
];
