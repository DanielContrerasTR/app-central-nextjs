import './AppsFilter.scss';

import { useEffect, useState } from 'react';
import { 
    SafBadge,
    SafButton,
    SafDrawer,
    SafFacetCategory,
    SafFacetedFilter,
    SafFacetItem,
    SafIcon,
    SafSrOnly 
} from '@saffron/core-components/react';

import { SortButton } from '../SortButton/SortButton';

import { FILTER_CATEGORIES } from './const';
import { QueryFilters, useQueryFilters } from 'app/shared/hooks/useQueryFilters';
import { FilterCategory } from 'app/types/FilterCategory';

export function AppsFilter() {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const { queryFilters, setQueryFilters, appliedFilters } = useQueryFilters();
    const [selectedFilters, setSelectedFilters]= useState<QueryFilters>({});

    const openDrawer = () => { setIsDrawerOpen(true); };
    const closeDrawer = () => { setIsDrawerOpen(false); };

    const onFilterSelect = (filterCategory: string, filter: string, value: boolean) => {
        const categoryFilters = selectedFilters[filterCategory] ?? [];

        const newFilters = {
            ...selectedFilters,
            [filterCategory]: value ? 
                [...(categoryFilters), filter] :
                categoryFilters.filter( v => v !== filter)
        };        
        setSelectedFilters(newFilters);
    };

    const isChecked = (category: string, filter: string) => selectedFilters[category]?.includes(filter);

    const onCancel = () => {
        setSelectedFilters(queryFilters);
        closeDrawer();
    };

    const onApply = () => {
        setQueryFilters(selectedFilters);
        closeDrawer();
    };

    const onClear = () => {
        setSelectedFilters({});
    };

    useEffect(() => {
        setSelectedFilters(queryFilters);
    }, [queryFilters]);

    return (
        <div className='apps-filter' data-testid='apps-filter'>
            <SortButton className='me-2'/>
            <SafButton 
                appearance='secondary'
                id='apps-filter-button'
                data-testid='apps-filter-button'
                onClick={openDrawer}
                className='apps-filter-button'
                aria-expanded='false'
                aria-controls='dropdown_menu_apps_filter_button'
                aria-haspopup='true'
            >
                <SafIcon slot='start' iconName='sliders' />
                Filter
                {
                    !!appliedFilters.length && 
                    <SafBadge appearance='info'
                        counter
                        attached
                        className='apps-filter-button-counter'>
                        {appliedFilters.length}
                        <SafSrOnly>applied filters</SafSrOnly>
                    </SafBadge>
                }
            </SafButton>

            <SafDrawer
                id='apps-filter-drawer'
                modal={true}
                hidden={!isDrawerOpen}
                isHeader='true'
                isFooter='true'
                noFocusTrap={false}
                drawerTitle='Filter'
                className='apps-filter-drawer'
                onHide={onCancel}
            >
                <SafFacetedFilter onClear={onClear}>
                    {
                        FILTER_CATEGORIES.map(({id, name, filters}) => (
                            <SafFacetCategory 
                                id={id}
                                summary={name}
                                key={id}
                                expanded
                                data-testid={id}>
                                {filters.map((filter: FilterCategory) => 
                                    <SafFacetItem 
                                        id={filter.id}
                                        key={filter.id}
                                        checked={isChecked(id, filter.id)}
                                        disabled={false}
                                        aria-expanded={false}
                                        onToggle={(e) => {
                                            onFilterSelect(id , filter.id, e.target.checked);
                                        }}
                                        facet-name={filter.name}
                                    />
                                )}
                            </SafFacetCategory>))
                    }
                </SafFacetedFilter>
                <div slot='footer' className='w-100 py-4 d-flex justify-content-end gap-2'>
                    <SafButton appearance='secondary' onClick={onCancel}>Cancel</SafButton>
                    <SafButton appearance='primary' onClick={onApply}>Apply</SafButton>
                </div>
            </SafDrawer>
        </div>
    );
}