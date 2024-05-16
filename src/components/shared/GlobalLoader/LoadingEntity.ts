import { getSafeId } from "app/shared/utils/common-utils";
import { Loading } from "app/types/GlobalLoader";

export class LoadingEntity {
  public loading: boolean = true;
  public id: string = getSafeId();

  constructor(partialLoading?: Partial<Loading>) {
    if (partialLoading?.id) {
      this.id = partialLoading.id;
    }

    if (partialLoading?.loading !== undefined) {
      this.loading = partialLoading.loading;
    }
  }

  startLoading() {
    this.loading = true;
    return this;
  }

  finishLoading() {
    this.loading = false;
    return this;
  }
}
