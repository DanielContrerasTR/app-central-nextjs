import { AppStoreReducer } from "./app-store.reducer";
import { GlobalLoaderReducer } from "./global-loader.reducer";
import { purchaseModalReducer } from "./purchase-modal.reducer";
import { purchaseWizarReducer } from "./purchase-wizard.reducer";
import { SideNavReducer } from "./side-nav.reducer";

export const rootReducer = {
  // KEEP IN ALPHABETICAL ORDER
  appStore: AppStoreReducer,
  globalLoader: GlobalLoaderReducer,
  purchaseModal: purchaseModalReducer,
  purchaseWizard: purchaseWizarReducer,
  sideNav: SideNavReducer,
};
