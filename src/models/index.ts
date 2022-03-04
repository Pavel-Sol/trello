export type IComment = {
  id: number;
  cardId: number;
  text: string;
};

export type ICard = {
  id: number;
  columnId: number;
  title: string;
  desc?: string;
};

export type IColumn = {
  id: number;
  title: string;
};
