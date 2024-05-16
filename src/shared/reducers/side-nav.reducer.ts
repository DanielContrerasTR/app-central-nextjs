import { createSlice } from "@reduxjs/toolkit";

export enum SideNavStates {
  CLOSED = "closed",
  OPEN = "open",
}

export const initialState = { currentState: SideNavStates.CLOSED };

export type SideNavState = Readonly<typeof initialState>;

export const SideNavSlice = createSlice({
  name: "sideNav",
  initialState: initialState as SideNavState,
  reducers: {
    reset() {
      return initialState;
    },
    open(state) {
      state.currentState = SideNavStates.OPEN;
    },
    close(state) {
      state.currentState = SideNavStates.CLOSED;
    },
    toggle(state) {
      const open =
        state.currentState === SideNavStates.OPEN
          ? SideNavStates.CLOSED
          : SideNavStates.OPEN;
      state.currentState = open;
    },
  },
});

export const { reset, open, close, toggle } = SideNavSlice.actions;

export const SideNavReducer = SideNavSlice.reducer;
