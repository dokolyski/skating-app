import { HttpClient, HttpParams } from "@angular/common/http"
import { of } from "rxjs"
import { RestService } from "./Rest.service"

describe('rest.service', () => {
    let counter = 0
    let mock: jasmine.SpyObj<HttpClient>
    let rest: RestService

    function testIt({url, input, output, templateParamsValues = {}}) {
        const method = url.METHOD.toLowerCase()
        rest.do(url, { body: input, templateParamsValues })
        .subscribe(o => {
            const [argUrl, ...rest] = mock[method].calls.mostRecent().args
            expect(o).toBe(output)
            switch(method) {
                case 'get':
                case 'delete':
                    const params = new HttpParams()
                    for(const [k, v] of Object.entries(input)) {
                        params.set(k, v as string)
                    }
                    expect(rest[0]['params'] as HttpParams).toEqual(params)
                break;
                default:
                    expect(rest[0]).toBe(input)
            }
        })
    }

    beforeEach(() => {
        const methods = ['get', 'post', 'put', 'delete', 'patch']
        mock = jasmine.createSpyObj('HttpClient', methods)
        rest = new RestService(mock)
    })

    it('works without template params and works methods: post, get', () => {
        mock.post.and.returnValue(of(0))
        mock.get.and.returnValue(of(1))

        
        testIt({
            url: {
                URL: 'url/post',
                METHOD: 'POST'
            }, 
            input: counter++, 
            output: 0
        })
        testIt({
            url: {
                URL: 'url/get',
                METHOD: 'GET'
            }, 
            input: {x: counter++}, 
            output: 1
        })

        expect(mock.get.calls.count()).toEqual(1)
        expect(mock.post.calls.count()).toEqual(1)
    })

    it('works with template params and works methods: put, patch, delete', () => {
        mock.put.and.returnValue(of(0))
        mock.patch.and.returnValue(of(1))
        mock.delete.and.returnValue(of(2))

        testIt({
            url: {
                URL: 'url/put/{x}',
                METHOD: 'PUT',
                PARAMS: ['x']
            }, 
            input: counter++, 
            output: 0,
            templateParamsValues: {x: counter++}
        })
        testIt({
            url: {
                URL: 'url/patch/{x}',
                METHOD: 'PATCH',
                PARAMS: ['x']
            }, 
            input: counter++, 
            output: 1,
            templateParamsValues: {x: counter++}
        })
        testIt({
            url: {
                URL: 'url/delete/{x}',
                METHOD: 'DELETE',
                PARAMS: ['x']
            }, 
            input: {x: counter++}, 
            output: 2,
            templateParamsValues: {x: counter++}
        })

        expect(mock.put.calls.count()).toEqual(1)
        expect(mock.patch.calls.count()).toEqual(1)
        expect(mock.delete.calls.count()).toEqual(1)
    })

    it('throw error on invalid template params', () => {
        const expectedError = Error('invalid template params keys')
        mock.put.and.returnValue(of(0))

        expect(testIt.bind(this, {
            url: {
                URL: 'url/put/{x}',
                METHOD: 'PUT',
                PARAMS: ['x']
            }, 
            input: counter++, 
            output: 0,
            templateParamsValues: {y: counter++}
        })).toThrow(expectedError)

        expect(testIt.bind(this, {
            url: {
                URL: 'url/put/{x}',
                METHOD: 'PUT',
                PARAMS: ['x', 'y']
            }, 
            input: counter++, 
            output: 0,
            templateParamsValues: {x: counter++}
        })).toThrow(expectedError)

        expect(testIt.bind(this, {
            url: {
                URL: 'url/put/{x}',
                METHOD: 'PUT',
                PARAMS: ['x']
            }, 
            input: counter++, 
            output: counter++,
            templateParamsValues: {x: counter++, y: counter++}
        })).toThrow(expectedError)
    })
})