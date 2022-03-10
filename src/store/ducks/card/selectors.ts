import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';

const getCards = (state: RootState) => state.card.cards;
export const selectCards = createSelector(getCards, (cards) => cards);
