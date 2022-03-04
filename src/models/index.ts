export type IComment = {
  id: number;
  text: string;
};

export type ICard = {
  id: number;
  title: string;
  columnsTitle: string;
  desc?: string;
  commentIds?: Array<number>;
};

export type IColumn = {
  id: number;
  title: string;
  cardIds: Array<number>;
};
