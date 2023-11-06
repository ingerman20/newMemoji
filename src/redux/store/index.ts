import { configureStore } from '@reduxjs/toolkit';
import memojiReducer from '../../pages/Memoji/redux/features/gameplay/gameplaySlice';
import { loadState } from './helpers';

export const store = configureStore({
  reducer: {
    memoji: memojiReducer,
  },
  preloadedState: loadState(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
