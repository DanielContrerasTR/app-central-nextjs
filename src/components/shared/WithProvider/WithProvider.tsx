import { Provider } from "react-redux";

import { getStore } from "../../../config/store";
import { type WithChildren } from "../../../types/WithChildren";

const store = getStore();

export function WithProvider({ children }: WithChildren) {
  return (
    <Provider store={store} data-testid="with-provider">
      {children}
    </Provider>
  );
}
