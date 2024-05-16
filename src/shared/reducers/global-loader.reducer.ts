import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type GlobalLoader, type Loading } from "app/types/GlobalLoader";

export const initialState: GlobalLoader = { loading: [] };

export type GlobalLoaderState = Readonly<typeof initialState>;

export const GlobalLoaderSlice = createSlice({
  name: "globalLoader",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    setLoading(state, action: PayloadAction<Loading>) {
      const loadingEntity = action.payload;

      if (loadingEntity.loading) {
        state.loading.push(loadingEntity);
      } else {
        state.loading = state.loading.filter(
          loading => loading.id !== loadingEntity.id
        );
      }
    },
  },
});

export const { reset, setLoading } = GlobalLoaderSlice.actions;

export const GlobalLoaderReducer = GlobalLoaderSlice.reducer;
