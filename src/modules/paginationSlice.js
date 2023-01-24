import { createSlice } from "@reduxjs/toolkit";

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    enableNext: false,
    enablePrev: false,
    pageNumber: 1,
    totalPages: 1,
    beg: 1,
    end: 10,
  },
  reducers: {
    prevPage: (state) => {
      if (state.pageNumber > 0) {
        state.pageNumber -= 1;
        [state.beg, state.end] =
          state.beg == 1 ? [1, state.end] : [state.beg - 1, state.end - 1];
      }
      state.enableNext = state.pageNumber >= state.totalPages;
      state.enablePrev = state.pageNumber <= 0;
    },
    nextPage: (state) => {
      if (state.pageNumber < state.totalPages) {
        state.pageNumber += 1;
        [state.beg, state.end] =
          state.end == state.totalPages
            ? [state.beg, state.totalPages]
            : [state.beg + 1, state.end + 1];
      }
      state.enableNext = state.pageNumber >= state.totalPages;
      state.enablePrev = state.pageNumber <= 0;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
      state.end = action.payload > 10 ? 10 : action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = parseInt(action.payload);
      state.enableNext = state.pageNumber >= state.totalPages;
      state.enablePrev = state.pageNumber <= 0;
    },
  },
});
export const { prevPage, nextPage, setTotalPages, setPageNumber } =
  paginationSlice.actions;
export default paginationSlice.reducer;
