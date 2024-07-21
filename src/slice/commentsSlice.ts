import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Comment = {
  id: string;
  id_comment: string;
  post_id: string;
  name: string;
  email: string;
  body: string;
}

type CommentsState = {
  comments: Comment[];
  total: number;
  loading: boolean;
  error: string;
}


//начальные состояния
const initialState: CommentsState = {
  comments: [],
  total: 0,
  loading: false,
  error: '',
};


const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.loading = true;
    },
    fetchCommentsSuccess(state, action: PayloadAction<{ comments: Comment[], total: number }>) {
      state.loading = false;
      state.comments = action.payload.comments;
      state.total = action.payload.total;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure } = commentsSlice.actions;

export default commentsSlice.reducer;
