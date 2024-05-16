import { type ThunkDispatch, type UnknownAction } from "@reduxjs/toolkit";

import { LoadingEntity } from "./LoadingEntity";
import { setLoading } from "app/shared/reducers/global-loader.reducer";

export class GlobalLoaderHandler {
  private readonly dispatch: ThunkDispatch<unknown, unknown, UnknownAction>;

  constructor(dispatch: ThunkDispatch<unknown, unknown, UnknownAction>) {
    this.dispatch = dispatch;
  }

  async run<T>(fn: () => Promise<T>) {
    const loading = new LoadingEntity({ loading: true });

    this.dispatch(setLoading(loading));

    try {
      return await fn();
    } finally {
      this.dispatch(setLoading(loading.finishLoading()));
    }
  }
}
