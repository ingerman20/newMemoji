/**
 * Перемешивает массив
 * @param array
 * @returns
 */
export const shuffleArray = <T>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

/**
 * Проверка на null или undefined
 */
export const isNullOrUndefined = (value: unknown) => {
  return value === undefined || value === null;
};
