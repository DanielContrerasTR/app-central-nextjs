export interface SearcherBase<Params, ReturnType> {
    search: (params: Params) => Promise<ReturnType>;
}