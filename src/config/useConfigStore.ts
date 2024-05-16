import { useAppDispatch, useAppSelector } from './store';

export const useConfigStore = () => {
    const dispatch = useAppDispatch();

    return {
        dispatch,
        useAppSelector
    };
};
