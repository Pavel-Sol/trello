import { ICard } from './../../../models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ICardState = {
  cards: ICard[];
};

const initialState: ICardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addCardToCardList(state, action: PayloadAction<{ card: ICard }>) {
      state.cards = [action.payload.card, ...state.cards];
    },
    deleteCardFromCardList(state, action: PayloadAction<{ cardId: number }>) {
      state.cards = state.cards.filter((el) => el.id !== action.payload.cardId);
    },
    updateCardList(state, action: PayloadAction<{ card: ICard }>) {
      state.cards = state.cards.map((el) => {
        return el.id === action.payload.card.id ? action.payload.card : el;
      });
    },
  },
});

export const { addCardToCardList, deleteCardFromCardList, updateCardList } = cardSlice.actions;
export default cardSlice.reducer;
