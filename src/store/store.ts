import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import infoReducer from './infoSlice';
// ...

const store = configureStore({
  reducer: {
    data: dataReducer,
    info: infoReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
