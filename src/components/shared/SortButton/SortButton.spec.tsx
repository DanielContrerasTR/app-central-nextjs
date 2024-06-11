import { screen } from '@testing-library/react';

import { initialState } from '../../shared/reducers/app-store.reducer';
import { renderWithProviders } from '../../shared/utils/test/renderWithProviders';

import { SortButton } from './SortButton';

describe('SortButton', () => {
    it('renders correctly', async () => {
        renderWithProviders(
            <SortButton />, {preloadedState:{ appStore: initialState}});        

        expect(screen.getByText('Sort')).toBeInTheDocument();
    });
});