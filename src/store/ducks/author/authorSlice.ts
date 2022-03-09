import { createSlice } from '@reduxjs/toolkit';

const authorSlice = createSlice({
  name: 'author',
  initialState: {
    author: '',
  },
  reducers: {
    setAuthorName(state, action) {
      state.author = action.payload.authorName;
    },
  },
});

export const { setAuthorName } = authorSlice.actions;
export default authorSlice.reducer;
