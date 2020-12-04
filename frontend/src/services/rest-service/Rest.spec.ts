import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { RestService } from "./Rest.service"
import { environment } from 'environments/environment.prod';
import { mergeMap, tap } from "rxjs/operators";

const withCredentials = true

describe('rest.service', () => {
    let mock: jasmine.SpyObj<HttpClient>
    let rest: RestService

    beforeEach(() => {
        const methods = ['get', 'post', 'put', 'delete', 'patch']
        mock = jasmine.createSpyObj('HttpClient', methods)
        rest = new RestService(mock)
    })

    it('works without template params and works methods: post, get', (done: DoneFn) => {
        of(() => {
            const url = {
                URL: 'url/post',
                METHOD: 'POST'
            }
            const body = 'post'
            const returns = 'post'
            mock.post.withArgs(`${environment.server_addr}/${url.URL}`, body, {withCredentials}).and.returnValue(of(returns))
            
            return rest.do<typeof returns>(url, {body})
            .pipe(
                tap(v => expect(v).toEqual(returns))
            )
        }).pipe(
            mergeMap(() => {
                const url = {
                    URL: 'url/get',
                    METHOD: 'GET'
                }
                const [key, value] = ['key', 'value']
                const returns = 'get'
                const params = new HttpParams()
                params.set(key, value)
                mock.get.withArgs(`${environment.server_addr}/${url.URL}`, {withCredentials, params }).and.returnValue(of(returns))
                
                return rest.do<typeof returns>(url, {body: {[key]: value}})
                .pipe(
                    tap(v => expect(v).toEqual(returns))    
                )
            })
        ).subscribe(() => done())
    })

    it('works with template params and works methods: put, patch, delete', (done: DoneFn) => {
        of(() => {
            const part = 'url/put'
            const url = {
                URL: `${part}/{x}`,
                METHOD: 'PUT',
                PARAMS: ['x']
            }
            const body = 'put'
            const returns = 'put'
            const templateParamsValues = {x: '1'}

            const path = `${environment.server_addr}/${part}/${templateParamsValues.x}`
            mock.put.withArgs(path, body, {withCredentials}).and.returnValue(of(returns))

            return rest.do<typeof returns>(url, {body, templateParamsValues})
            .pipe(
                tap(v => expect(v).toEqual(returns))    
            )
        }).pipe(
            mergeMap(() => {
                const part = 'url/patch'
                const url = {
                    URL: `${part}/{x}`,
                    METHOD: 'PATCH',
                    PARAMS: ['x']
                }
                const body = 'patch'
                const returns = 'patch'
                const templateParamsValues = {x: '1'}

                const path = `${environment.server_addr}/${part}/${templateParamsValues.x}`
                mock.patch.withArgs(path, body, {withCredentials}).and.returnValue(of(returns))
    
                return rest.do<typeof returns>(url, {body, templateParamsValues})
                .pipe(
                    tap(v => expect(v).toEqual(returns))    
                )
            }),
            mergeMap(() => {
                const part = 'url/delete'
                const url = {
                    URL: `${part}/{x}`,
                    METHOD: 'DELETE',
                    PARAMS: ['x']
                }
                const [key, value] = ['key', 'value']
                const returns = 'delete'
                const params = new HttpParams()
                params.set(key, value)
                const templateParamsValues = {x: '1'}

                const path = `${environment.server_addr}/${part}/${templateParamsValues.x}`
                mock.delete.withArgs(path, {withCredentials, params}).and.returnValue(of(returns))
    
                return rest.do<typeof returns>(url, {body: {[key]: value}, templateParamsValues})
                .pipe(
                    tap(v => expect(v).toEqual(returns))    
                )
            })
        ).subscribe(() => done())
    })

    it('throw error on invalid template params', (done: DoneFn) => {
        const expectedError = Error('invalid template params keys')
        of(() => new Observable(s => {
                const url = {
                    URL: `url/put/{x}`,
                    METHOD: 'PUT',
                    PARAMS: ['x']
                }
                const body = 'put'
                const templateParamsValues = {y: '1'}
                
                rest.do(url, {body, templateParamsValues}).subscribe({error: e => {
                    expect(e).toEqual(expectedError)
                    s.next()
                }})
            })
        ).pipe(
            mergeMap(() => new Observable(s => {
                const url = {
                    URL: `url/patch/{x}`,
                    METHOD: 'PATCH',
                    PARAMS: ['x', 'y']
                }
                const body = 'patch'
                const templateParamsValues = {x: '1'}

                rest.do(url, {body, templateParamsValues}).subscribe({error: e => {
                    expect(e).toEqual(expectedError)
                    s.next()
                }})
            })),
            mergeMap(() => new Observable(s => {
                const url = {
                    URL: `url/delete/{x}`,
                    METHOD: 'DELETE',
                    PARAMS: ['x']
                }
                const [key, value] = ['key', 'value']
                const templateParamsValues = {x: '1', y: '2'}
                
                rest.do(url, {body: {[key]: value}, templateParamsValues}).subscribe({error: e => {
                    expect(e).toEqual(expectedError)
                    s.next()
                }})
            }))
        ).subscribe(() => done())
    })
})