export interface FilterCategory {
    id: string;
    name: string;
    filters: Filter[]
}
export interface Filter {
    id: string;
    name: string
}

export interface TopCategory {
    categoryId: string;
    filterId: string;
}