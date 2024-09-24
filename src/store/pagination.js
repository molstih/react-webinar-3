import {useMemo} from "react";
import {range} from '../utils'

export const DOTS = '...'

export default function usePagination({
                                        total,
                                        size,
                                        sibling = 1,
                                        current
                                   }) {
  const paginationRange = useMemo(() => {

    console.log(current)
    const totalPageCount = Math.ceil(total / size);
    const totalPageNumbers = sibling + 5;

    // 1 вариант: Если страниц меньше чем 6, то просто выводим пагинацию
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // находим индексы элементов рядом с текущей страницей
    const leftIndex = Math.max(current - sibling, 1);
    const rightIndex = Math.min(current + sibling, totalPageCount);

    const isLeftDots = leftIndex > 2;
    const isRightDots = rightIndex < totalPageCount - 1;

    const firstIndex = 1;
    const lastIndex = totalPageCount;

    if (isLeftDots && isRightDots) {
      let middle = range(leftIndex, rightIndex);
      return [firstIndex, DOTS, ...middle, DOTS, lastIndex];
    }


    if (isLeftDots && !isRightDots) {
      let rightCount = 3 + 2 * sibling;
      let right = range(current === totalPageCount - rightCount + 3 ? totalPageCount - rightCount + 2 : totalPageCount - rightCount + 3, totalPageCount);
      return [firstIndex, DOTS, ...right];
    }

    if (!isLeftDots && isRightDots) {
      let leftCount = 1 + 2 * sibling;
      let left = range(1, current === 3 ? leftCount + 1 : leftCount);
      return [...left, DOTS, totalPageCount];
    }

  }, [total, size, sibling, current])

  return paginationRange


}
