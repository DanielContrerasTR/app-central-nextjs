import { WithId } from "./WithId";

export interface Loading extends WithId<string> {
  loading: boolean;
}

export interface GlobalLoader {
  loading: Loading[];
}
