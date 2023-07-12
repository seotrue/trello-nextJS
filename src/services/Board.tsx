import {createAsyncThunk} from "@reduxjs/toolkit";

export const loadBoardAsync = createAsyncThunk(
  'board/SITE/loadUserListAsync',
  async (body, thunkApi) => {
    try {

    } catch (e) {
      return e;
    }
  }
);