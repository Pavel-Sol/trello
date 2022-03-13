import { ICard, IColumn, IComment } from './../../models/index';

export type CardDetailsPropsType = {
  currentCard: ICard | null;
  columns: IColumn[];
};

export type CardTitleValuesType = {
  cardTitle: string;
};

export type CardDescValuesType = {
  cardDesc: string;
};

export type CommentPropsType = {
  commentData: IComment;
};

export type CommentTextValuesType = {
  commentText: string;
};
