import { useEffect, useState } from 'react';

import { type PageContent } from '../../types/PageContent';
import { type PathOptions } from '../../types/PageContentEnums';
import { getPageContent } from '../utils/PageContentApi/PageContentApi';
import { useGlobalLoader } from './useGlobalLoader';
import { ROUTE_PATHS } from '../../shared/const';
import { useRouter } from "next/navigation";

const useFetchPageContent = () => {
    const { startGlobalLoading, finishGlobalLoading } = useGlobalLoader();

    const fetchPageContentByPath = async (path: PathOptions) => {
        if (!path) return null;

        const loaderId = startGlobalLoading();

        try {
            return await getPageContent(path);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
            return null;
        } finally {
            finishGlobalLoading(loaderId);
        }
    };

    return { fetchPageContentByPath };
};

export const usePageContent = (path: PathOptions) => {
    const router = useRouter();
    const [content, setContent] = useState<PageContent | null>(null);
    const { fetchPageContentByPath } = useFetchPageContent();

    useEffect(() => {
        const fetchContent = async () => {            
            const response = await fetchPageContentByPath(path);
            if (!response) {
                router.push(ROUTE_PATHS.notFoundPage);
                return;
            }
            setContent(response);
        };

        void fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return  { content } ;
};
