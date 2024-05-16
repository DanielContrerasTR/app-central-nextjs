import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type AppStore } from "../../types/AppStore";
import { type Customer } from "../../types/Customer";

export const emptyCustomer: Customer = {
  firstName: "",
  lastName: "",
  country: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
  organizationType: "",
  jobTitle: "",
  company: "",
};

const initialState = {
  appToBuy: null as null | AppStore,
  selectedPlan: "" as string,
  customer: emptyCustomer,
};

export type PurchaseWizardState = Readonly<typeof initialState>;

export const purchaseWizardSlice = createSlice({
  name: "purchaseWizard",
  initialState: initialState as PurchaseWizardState,
  reducers: {
    reset() {
      return initialState;
    },
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customer = {
        ...state.customer,
        ...action.payload,
      };
    },
    setAppToBuy(state, action: PayloadAction<AppStore | null>) {
      state.appToBuy = action.payload;
    },
    setSelectedPlan(state, action: PayloadAction<string>) {
      state.selectedPlan = action.payload;
    },
  },
});

export const { reset, setCustomer, setAppToBuy, setSelectedPlan } =
  purchaseWizardSlice.actions;

export const purchaseWizarReducer = purchaseWizardSlice.reducer;
