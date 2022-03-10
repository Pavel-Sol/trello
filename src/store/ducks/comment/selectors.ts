import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const getComments = (state: RootState) => state.comment.comments;
export const selectComments = createSelector(getComments, (comments) => comments);
