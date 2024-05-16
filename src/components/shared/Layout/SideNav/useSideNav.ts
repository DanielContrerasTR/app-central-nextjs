import { useConfigStore } from "app/config/useConfigStore";
import { reset } from "app/shared/reducers/app-store.reducer";
import { close, open, toggle } from "app/shared/reducers/side-nav.reducer";

export const useSideNav = () => {
  const { useAppSelector, dispatch } = useConfigStore();

  const { currentState: sideNavState } = useAppSelector(
    ({ sideNav }) => sideNav
  );

  const openSideNav = () => {
    dispatch(open());
  };

  const closeSideNav = () => {
    dispatch(close());
  };

  const toggleSideNav = () => {
    dispatch(toggle());
  };

  const resetSideNavState = () => {
    dispatch(reset());
  };

  return {
    sideNavState,
    openSideNav,
    closeSideNav,
    toggleSideNav,
    resetSideNavState,
  };
};
