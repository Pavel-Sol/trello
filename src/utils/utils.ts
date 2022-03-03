import { IColumn } from './../models/index';

export const updateColumnsByTitle = (
  columnInfo: IColumn,
  columns: Array<IColumn>,
  columnsTitle: string,
) => {
  const updatedColumn = [...columns].map((el) => {
    if (el.id === columnInfo.id) {
      el.title = columnsTitle;
      return el;
    } else {
      return el;
    }
  });

  return updatedColumn;
};

export const updateColumnsByCardsId = (
  columnInfo: IColumn,
  columns: Array<IColumn>,
  newCardId: number,
) => {
  const updatedColumn = [...columns].map((el) => {
    if (el.id === columnInfo.id) {
      el.cardIds = [...el.cardIds, newCardId];
      return el;
    } else {
      return el;
    }
  });

  return updatedColumn;
};
