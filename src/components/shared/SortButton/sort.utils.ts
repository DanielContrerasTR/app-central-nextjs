import { toSlugCase } from 'app/shared/utils/common-utils';
import { WithId } from 'app/types/WithId';

export type SortOrder = 'asc' | 'desc';

export interface SortOption extends WithId<string> {
    label: string;
    value: string;
    sortOrder: SortOrder;
}
// TODO: Improve this, the sortOrder value should be decoupled from SORT_OPTIONS
export const SORT_OPTIONS: SortOption[] = [
    {
        id: 'name-asc', 
        label: 'Name (A to Z)',
        value: 'name',
        sortOrder: 'asc'
    },
    {
        id: 'name-desc',
        label: 'Name (Z to A)',
        value: 'name',
        sortOrder: 'desc'
    },
    {
        id: 'featured-asc',
        label: 'Featured',
        value: 'featured',
        sortOrder: 'asc'
    },
    {
        id: 'best-selling-asc',
        label: 'Best selling',
        value: 'best-selling',
        sortOrder: 'asc'
    },
    {
        id: 'release-date-asc',
        label: 'Release date (newest to oldest)',
        value: 'release-date',
        sortOrder: 'asc'
    },
    {
        id: 'top-rated-asc',
        label: 'Top rated',
        value: 'top-rated',
        sortOrder: 'asc'
    }
] as const;


export const getSelectedSortOption = (value: string, sortOrder: SortOrder) => 
    SORT_OPTIONS.find(sortOption => sortOption.value === toSlugCase(value) && sortOption.sortOrder === sortOrder);
