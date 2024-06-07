import { Metadata, ResolvingMetadata } from "next";

import StoreApi from "app/shared/utils/StoreApi";
import { AppDetails } from "./App";

type Props = {
  params: { app: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const app = await StoreApi.getAppDetailsByName(params.app);

  return {
    title: app.title,
    description: app.description,
  };
}

export default function Page(props: Props) {
  return <AppDetails params={props.params} />;
}
