import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initialState } from '../../shared/reducers/app-store.reducer';
import { renderWithProviders } from '../../shared/utils/test/renderWithProviders';

import { AppsFilter } from './AppsFilter';

// TODO: Why this tests are taking so long to complete?
jest.setTimeout(20000);

describe('AppsFilter', () => {
    it('renders correctly', async () => {
        renderWithProviders(
            <AppsFilter />, {preloadedState:{ appStore: initialState}});        

        expect(screen.getByTestId('apps-filter-button')).toBeInTheDocument();
        expect(screen.getByText('Filter')).toBeInTheDocument();
        expect(screen.getByTestId('categories')).not.toBeVisible();

        await userEvent.click(screen.getByTestId('apps-filter-button'));

        await waitFor(() => { expect(screen.getByTestId('works-with')).toBeVisible(); });
        await waitFor(() => { expect(screen.getByTestId('categories')).toBeVisible(); });
        await waitFor(() => { expect(screen.getByTestId('capabilities')).toBeVisible(); });
        await waitFor(() => { expect(screen.getByTestId('developer')).toBeVisible(); });
    });
});