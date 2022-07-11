import { UrlBuilder } from 'app/services/http/url/url-builder';

describe('Http/Url/UrlBuilder', () => {
    it('builds basic url', () => {
        expect(UrlBuilder.build('https://products-shop.app', 'business/dodo')).toBe(
            'https://products-shop.app/business/dodo',
        );
    });

    it('builds basic url and handles trailing slashes', () => {
        expect(UrlBuilder.build('https://products-shop.app/', 'business/dodo')).toBe(
            'https://products-shop.app/business/dodo',
        );
        expect(UrlBuilder.build('https://products-shop.app', '/business/dodo')).toBe(
            'https://products-shop.app/business/dodo',
        );
        expect(UrlBuilder.build('https://products-shop.app/', '/business/dodo')).toBe(
            'https://products-shop.app/business/dodo',
        );
    });

    it('builds url without path', () => {
        expect(UrlBuilder.build('https://products-shop.app/')).toBe('https://products-shop.app');
    });

    it('builds basic url with params', () => {
        expect(
            UrlBuilder.build('https://products-shop.app', 'business/:business', {
                business: 'dodo',
            }),
        ).toBe('https://products-shop.app/business/dodo');
    });

    it('builds basic url with multiple params', () => {
        expect(
            UrlBuilder.build('https://products-shop.app', 'business/:business/:category', {
                business: 'dodo',
                category: 'pizza',
            }),
        ).toBe('https://products-shop.app/business/dodo/pizza');
    });

    it('builds url with params and query', () => {
        expect(
            UrlBuilder.build(
                'https://products-shop.app',
                'business/:business',
                { business: 'dodo', type: 'pizza' },
                { type: ':type' },
            ),
        ).toBe('https://products-shop.app/business/dodo?type=pizza');
    });

    it('builds url with params without path', () => {
        expect(UrlBuilder.build('https://:host.app', null, { host: 'products-shop' })).toBe('https://products-shop.app');
    });

    it('builds url with params with absolute path', () => {
        expect(UrlBuilder.build('https://products-shop.app.app', 'https://example.com')).toBe('https://example.com');
        expect(UrlBuilder.build('https://products-shop.app.app', 'http://example.com')).toBe('http://example.com');
    });

    it('constructs query string', () => {
        expect(UrlBuilder.constructQuery({ one: 'one' })).toBe('?one=one');
        expect(UrlBuilder.constructQuery({ one: 'one', two: 'two' })).toBe('?one=one&two=two');
        expect(UrlBuilder.constructQuery({ one: 'one', two: undefined })).toBe('?one=one');
        expect(
            UrlBuilder.constructQuery({
                one: 'one',
                two: 'two',
                three: undefined,
            }),
        ).toBe('?one=one&two=two');
        expect(
            UrlBuilder.constructQuery({
                one: 'one',
                two: undefined,
                three: 'three',
            }),
        ).toBe('?one=one&three=three');
        expect(UrlBuilder.constructQuery({ one: 'one', two: ['1', '2'] })).toBe('?one=one&two[]=1&two[]=2');
        expect(UrlBuilder.constructQuery({ one: 'one', two: ['1', undefined] })).toBe('?one=one&two[]=1');
        expect(UrlBuilder.constructQuery({ one: 'one', two: [undefined, '2'] })).toBe('?one=one&two[]=2');
        expect(
            UrlBuilder.constructQuery({
                one: 'one:one',
                two: ['two$two', '2,3'],
                three: '6 1 7',
                four: '6+1=7',
            }),
        ).toBe('?one=one:one&two[]=two$two&two[]=2,3&three=6+1+7&four=6%2B1%3D7');
        expect(
            UrlBuilder.constructQuery({
                one: 'one',
                two: [undefined, '2'],
                three: ['3', undefined, '4'],
                four: 'four',
                five: undefined,
                six: 'six',
                seven: ['lucky', undefined, 'seven'],
            }),
        ).toBe('?one=one&two[]=2&three[]=3&three[]=4&four=four&six=six&seven[]=lucky&seven[]=seven');
    });
});
