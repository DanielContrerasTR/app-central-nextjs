import { transformFromSearchParams, transformToSearchParams } from './filter-utils';

describe('transformFromSearchParams', () => {
    it('should return the expected object', () => {
        const url = new URL('https://example.com?categories=filterA&bar=filter1,filter2&capabilities=filterZ');
        const searchParams = new URLSearchParams(url.search);

        const expected = {
            categories: ['filterA'],
            capabilities: ['filterZ']
            
        };
        expect(transformFromSearchParams(searchParams)).toEqual(expected);
    });
});

describe('transformToSearchParams', () => {
    it('should return the expected object', () => {
        const params = {
            foo: ['filterA'],
            bar: ['filter1', 'filter2']
        };

        const expected = {
            foo: 'filterA',
            bar: 'filter1,filter2' 
        };
        expect(transformToSearchParams(params)).toEqual(expected);
    });
});


