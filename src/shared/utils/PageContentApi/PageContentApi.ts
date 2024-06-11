import { type PageContent } from '../../../types/PageContent';
import { client } from '../AxiosClient';

export async function getPageContent(path: string): Promise<PageContent> {
    const { data }  = await client.get<PageContent>(`/pages/${path}`);
    return data;
}
