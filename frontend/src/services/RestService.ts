import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

@Injectable({
    providedIn: 'root'
})
class RestService {
    constructor(private http: HttpClient) {}

    do<ReturnType>(rest_url: {URL: string, METHOD: HttpMethod, PARAMS?: string[]}, 
        options: {templateParamsValues?: string[], body?: any} = {}): Observable<ReturnType> {

        const readyUrl = rest_url.PARAMS ? this.parseTemplateUrl(rest_url.URL, rest_url.PARAMS, options.templateParamsValues) : rest_url.URL
        
        let params
        if(rest_url.METHOD == 'GET' || rest_url.METHOD == 'DELETE') {
            params = this.parseQueryParams(options.body)
        }

        return this.sendRequest(readyUrl, rest_url.METHOD, { body: options.body, params })
    }

    private parseTemplateUrl(templateUrl: string, templateParams: string[], paramsValues: string[]): string {
        return templateParams.reduce((p, c, i) => p.replace(`{${c}}`, paramsValues[i]), templateUrl)
    }

    private parseQueryParams(body): HttpParams {
        const params = new HttpParams()
        for(const [k, v] of Object.entries(body)) {
            params.set(k, v as string)
        }
        return params
    }

    private sendRequest(url: string, method: HttpMethod, 
        payload: { body?, params?: HttpParams}): Observable<any> {
        const options = {withCredentials: true}
        switch(method) {
            case 'GET':
                options['params'] = payload.params  
                return this.http.get(url, options)
            case 'DELETE':
                options['params'] = payload.params  
                return this.http.delete(url, options)
            case 'POST':
                return this.http.post(url, payload.body, options)
            case 'PUT':
                return this.http.put(url, payload.body, options)
            case 'PATCH':
                return this.http.patch(url, payload.body, options)
            default:
                throw Error('Invalid HttpMethod (unhandled ?)')
        }
    }
}