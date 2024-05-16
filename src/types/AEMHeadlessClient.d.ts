/* eslint-disable @typescript-eslint/no-explicit-any */
declare  module '@adobe/aem-headless-client-js' {
    export default class AEMHeadless {
        constructor(config: Record<string, string | undefined | object>);
        runQuery(queryString:string): any;
        runPersistedQuery(queryString:string, data?:Record<string, string | undefined | any> | undefined): any;
    }
}