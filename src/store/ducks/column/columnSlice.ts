import { IColumn } from './../../../models/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const columnSlice = createSlice({
  name: 'column',
  initialState: {
    columns: [
      { id: 0, title: 'TODO' },
      { id: 1, title: 'In Progress' },
      { id: 2, title: 'Testing' },
      { id: 3, title: 'Done' },
    ],
  },
  reducers: {
    updateColumnList(state, action: PayloadAction<{ column: IColumn }>) {
      state.columns = state.columns.map((el) => {
        return el.id === action.payload.column.id ? action.payload.column : el;
      });
    },
  },
});

export const { updateColumnList } = columnSlice.actions;
export default columnSlice.reducer;
