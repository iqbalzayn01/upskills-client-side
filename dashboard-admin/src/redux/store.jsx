import { configureStore } from '@reduxjs/toolkit';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()),
});

export default store;
