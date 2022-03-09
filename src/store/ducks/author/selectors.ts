import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const getAuthor = (state: RootState) => state.author.author;
export const selectAuthor = createSelector(getAuthor, (author) => author);
