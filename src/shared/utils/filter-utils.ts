import { FILTER_CATEGORIES } from "../const";

export const transformFromSearchParams = (searchParams: URLSearchParams) => {
    const validCategories = FILTER_CATEGORIES.map(({id}) => id);
    return Object.fromEntries(
        [...searchParams]
            .filter(([category, value]) => value && validCategories.includes(category))
            .map(([key, value]) => [key, value.split(',')]));
};

export const transformToSearchParams = (searchParams: Record<string, string[]>) => Object.fromEntries(
    Object.entries(searchParams)
        .map(([key, value])=> [key, value.join(',')])
        .filter(([_, value])=> value.length)
);