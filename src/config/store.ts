import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import {
  type AnyAction,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { rootReducer } from "../shared/reducers";

// TODO: working on middlewares
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultMiddlewares: any[] = [];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...defaultMiddlewares),
});

export const getStore = () => store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
