import { useGlobalLoader } from 'app/shared/hooks/useGlobalLoader';
import { LinkCardApp } from '../LinkCardApp/LinkCardApp';

import { useAppStoreSearch } from './useAppStoreSearch';
import { AppsAndFiltersInfo } from '../AppsAndFiltersInfo/AppsAndFiltersInfo';

export function AppStoreCardSearchResults() {
    const { apps } = useAppStoreSearch();
    const { isLoading } = useGlobalLoader();

    if (isLoading) {
        return null;
    }

    return <div className='apps-page-container' data-testid='app-store-card-search-results'>
        <AppsAndFiltersInfo apps={apps} />

        <div className='d-grid gap-4 my-4 apps-page-results' data-testid='app-grid'>
            {apps.map(app => <LinkCardApp key={app.id} {...app} />)}
        </div>
    </div>;
}
