import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { RestJSON } from 'api/rest-types';

type RestPath = {URL: string, METHOD: string, PARAMS?: string[]}
type RestOptions = {templateParamsValues?: {[key: string]: string}, body?: RestJSON}

@Injectable({
    providedIn: 'root'
})
export class RestService {
    constructor(private http: HttpClient) {}

    do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {

        let readyUrl = restPath.PARAMS ? this.parseTemplateUrl(restPath.URL, restPath.PARAMS, options.templateParamsValues) : restPath.URL
        readyUrl = `${environment.server_addr}/${readyUrl}`
        
        let params: HttpParams
        if(restPath.METHOD == 'GET' || restPath.METHOD == 'DELETE') {
            params = this.parseQueryParams(options.body)
        }

        return this.sendRequest(readyUrl, restPath.METHOD, { body: options.body, params })
    }

    private parseTemplateUrl(templateUrl: string, templateParams: string[], paramsValues: {[key: string]: string}): string {
        this.verifyTemplateErrors(templateParams, paramsValues)
        return templateParams.reduce((p, c) => p.replace(`{${c}}`, paramsValues[c]), templateUrl)
    }

    private verifyTemplateErrors(templateParams: string[] = [], paramsValues: {[key: string]: string} = {}): void|never {
        const differentLength = templateParams.length != Object.keys(paramsValues).length
        const differentArgs = !templateParams.every(p => p in paramsValues)
            
        if(differentLength || differentArgs) {
            throw Error('invalid template params keys')
        }
    }

    private parseQueryParams(body: RestJSON): HttpParams {
        const params = new HttpParams()
        for(const [k, v] of Object.entries(body)) {
            params.set(k, v as string)
        }
        return params
    }

    private sendRequest(url: string, method: string, 
        payload: { body?: RestJSON, params?: HttpParams}): Observable<any> {
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