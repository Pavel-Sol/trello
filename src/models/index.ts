export type IComment = {
  id: string;
  desc: string;
};

export type ICard = {
  id: string;
  title: string;
  desc?: string;
  commentIds?: Array<string>;
};

export type IColumn = {
  id: number;
  title: string;
  cardIds: Array<string>;
};
