export interface Environment {
    environment: string | undefined;
    aemHostUri: string | undefined;
    aemGraphqlEndpoint: string | undefined;
    appStorePath: string | undefined;
    outputDomain: string;
}