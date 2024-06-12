import FAQ from "./Faq";
import { getPageContent } from "app/shared/utils/PageContentApi/PageContentApi"; 
import { PathOptions } from "app/types/PageContentEnums";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { app: string };
};
 

export async function generateMetadata(
    {params} : Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const response = await getPageContent(PathOptions.FAQ);

    return {
        title: response.title
    };
}

export default function Page(props: Props) { 
    return <FAQ />
};
