import { AppStore } from 'app/types/AppStore';
import { FilterChip } from '../FilterChip/FilterChip';
import { useQueryFilters } from 'app/shared/hooks/useQueryFilters';

interface AppsAndFiltersInfoProps {
    apps: AppStore[];
}

export function AppsAndFiltersInfo({ apps }: AppsAndFiltersInfoProps) {
    const { appliedFilters } = useQueryFilters();

    return (
        <>
            <h2 className='m-0 apps-page-results-label' data-testid='results-label'>
                Showing {apps.length} apps{appliedFilters.length ? ' filtered by:' : ''}
            </h2>
            <div className='my-4 d-flex gap-2 flex-wrap'>
                {appliedFilters.map(filter => <FilterChip key={filter} filterId={filter}/>)}
            </div>
        </>
    );
}
