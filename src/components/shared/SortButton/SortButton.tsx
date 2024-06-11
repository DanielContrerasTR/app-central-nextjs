import './SortButton.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { 
    SafAnchorRegion,
    SafButton,
    SafDivider,
    SafIcon,
    SafMenu,
    SafMenuItem
} from '@saffron/core-components/react';

import { getSelectedSortOption, SORT_OPTIONS, type SortOption } from './sort.utils';
import { useOutsideClick } from 'app/shared/hooks/useOutsideClick';
import { DEFAULT_ORDER, DEFAULT_SORT, useQueryFilters } from 'app/shared/hooks/useQueryFilters';
import { WithOptionalClassName } from 'app/types/WithOptionalClassName';
import { toSlugCase } from 'app/shared/utils/common-utils';
import { usePathname } from 'next/navigation';
import { useCustomNavigate } from 'app/shared/hooks/useCustomNavigate';

interface SortButtonProps extends WithOptionalClassName {
    sortOptions?: SortOption[];
}

export function SortButton({ className = '', sortOptions = SORT_OPTIONS }: SortButtonProps) {
    const pathname = usePathname();
    const { navigate } = useCustomNavigate();

    const { sortOption, sortOrder, setSearchParams, searchParams } = useQueryFilters();

    const selectedSortOption = useMemo(() => getSelectedSortOption(sortOption, sortOrder), [sortOption, sortOrder]);

    const [isSortPopoverOpen, setIsSortPopoverOpen] = useState<boolean>(false);
    const wrapperRef = useRef(null);
    
    const openPopover = () => { setIsSortPopoverOpen(true); };
    const closePopover = () => { setIsSortPopoverOpen(false); };
    
    useOutsideClick(wrapperRef, closePopover);

    const onSortOptionClick = (sort: SortOption) => {
        // searchParams.set('sort', toSlugCase(sort.value));
        // searchParams.set('order', toSlugCase(sort.sortOrder));
        const updatedSearchParams = setSearchParams({ sort: toSlugCase(sort.value), order: toSlugCase(sort.sortOrder) });
        navigate(`${pathname}?${updatedSearchParams.toString()}`);
    };

    // Setting the default sort param to url on mount in case it doesn't exists
    useEffect(() => {
        let result = {};
        
        if (!searchParams.get('sort')) {
            result = { ...result, sort: toSlugCase(DEFAULT_SORT) };
            // searchParams.set('sort', toSlugCase(DEFAULT_SORT));
            // setSearchParams(searchParams);
        }

        if (!searchParams.get('order')) {
            result = { ...result, order: toSlugCase(DEFAULT_ORDER) };
            // searchParams.set('order', toSlugCase(DEFAULT_ORDER));
            // setSearchParams(searchParams);
        }

        const updatedSearchParams = setSearchParams(result);
        navigate(`${pathname}?${updatedSearchParams.toString()}`) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <SafButton 
                id='sort-button'
                appearance='secondary'
                className={className}
                onClick={openPopover}
                aria-expanded='false'
                aria-controls='dropdown_menu_sort_button'
                aria-haspopup='true'
            >
                <SafIcon slot='start'iconName='sort' />
                Sort
            </SafButton>
            {
                isSortPopoverOpen && 
                <SafAnchorRegion autoUpdateMode='anchor'
                    anchor='sort-button'
                    className='mt-1 sort-popover'
                    ref={wrapperRef}>
                    <SafMenu className='p-3'>
                        <p className='my-2'>
                            Sort by:
                        </p>
                        <SafDivider className='mb-2'/>
                        {sortOptions.map(option => 
                            <SafMenuItem 
                                key={option.id}
                                onClick={() => { onSortOptionClick(option); }}
                                checked={option.id === selectedSortOption?.id}
                                role='menuitemradio'
                            >
                                {option.label}
                            </SafMenuItem>
                        )}
                    </SafMenu>
                </SafAnchorRegion>
            }
        </>
    );
}