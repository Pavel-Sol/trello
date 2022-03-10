import { IComment } from './../../../models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ICommentState = {
  comments: IComment[];
};

const initialState: ICommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addCommentToCommentList(state, action: PayloadAction<{ comment: IComment }>) {
      state.comments = [action.payload.comment, ...state.comments];
    },
    deleteCommentFromCommentList(state, action: PayloadAction<{ commentId: number }>) {
      state.comments = state.comments.filter((el) => el.id !== action.payload.commentId);
    },
    updateCommentList(state, action: PayloadAction<{ comment: IComment }>) {
      state.comments = state.comments.map((el) => {
        return el.id === action.payload.comment.id ? action.payload.comment : el;
      });
    },
  },
});

export const { addCommentToCommentList, deleteCommentFromCommentList, updateCommentList } =
  commentSlice.actions;
export default commentSlice.reducer;
