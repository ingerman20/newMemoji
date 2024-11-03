import { useEffect, useState } from 'react';
import {
  Orientation,
  cardsLayouts,
  columnGapWidth,
  horizontalPadding,
  rowGapHeight,
  verticalPadding,
} from './settings';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '../../../../redux/hooks';

export const useCardsInfo = () => {
  const { pairsCount } = useAppSelector((state) => state.memoji);

  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const [cardsContainerSizes, setCardsContainerSizes] = useState({
    height: 0,
    width: 0,
  });

  const layout = cardsLayouts.find((item) => item.pairsOfCards === pairsCount)!;
  const orientation =
    windowWidth >= windowHeight ? Orientation.ALBUM : Orientation.PORTRAIT;

  const columnGapsCount = layout.columns - 1;
  const rowGapsCount = layout.rows - 1;

  useEffect(() => {
    const cellSize1 = (windowHeight - verticalPadding) / layout.rows; // Размер по высоте
    const cellSize2 = (windowWidth - horizontalPadding) / layout.columns; // Размер по ширине

    if (cellSize1 < cellSize2) {
      setCardsContainerSizes({
        height:
          orientation === Orientation.ALBUM
            ? cellSize1 * layout.rows
            : cellSize1 * layout.columns + columnGapsCount * columnGapWidth,
        width:
          orientation === Orientation.ALBUM
            ? cellSize1 * layout.columns
            : cellSize1 * layout.rows + rowGapsCount * rowGapHeight,
      });
    } else {
      setCardsContainerSizes({
        height:
          orientation === Orientation.ALBUM
            ? cellSize2 * layout.rows
            : cellSize2 * layout.columns + columnGapsCount * columnGapWidth,
        width:
          orientation === Orientation.ALBUM
            ? cellSize2 * layout.columns
            : cellSize2 * layout.rows + rowGapsCount * rowGapHeight,
      });
    }
  }, [
    columnGapsCount,
    layout.columns,
    layout.rows,
    orientation,
    rowGapsCount,
    windowHeight,
    windowWidth,
  ]);

  return {
    cardsContainer: cardsContainerSizes,
    orientation,
    countOfRows: layout.rows,
    countOfColumns: layout.columns,
  };
};
