import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';
import { RestJSON } from 'api/rest-models';
import { mergeMap } from 'rxjs/operators';

export type RestPath = {URL: string, METHOD: string, PARAMS?: string[]}
export type RestOptions = {templateParamsValues?: {[key: string]: string}, body?: RestJSON}

/**
 * @summary General purpose proxy to the ```REST``` server
 * @description Allow to communicates easily with the ```REST``` server, can use template URL path, handle methods: ```GET```, ```POST```, ```PUT```, ```PATCH```, ```DELETE```
 */
@Injectable()
export class RestService {
    constructor(private http: HttpClient) {}

    /**
     * @description Parse data and send request to the REST server
     * @param restPath informations loaded from end node from `rest-url.json`
     * @param options ```body``` or ```HTTP Query Params```, template URL path with values
     */
    do<ReturnType = void>(restPath: RestPath, options: RestOptions = {}): Observable<ReturnType> {
        return new Observable(s => {
            try{
                let readyUrl = restPath.PARAMS ? this.parseTemplateUrl(restPath.URL, restPath.PARAMS, options.templateParamsValues) : restPath.URL
                readyUrl = `${environment.server_addr}/${readyUrl}`
                
                let params: HttpParams
                if(restPath.METHOD == 'GET' || restPath.METHOD == 'DELETE') {
                    params = this.parseQueryParams(options.body)
                }
        
                s.next(this.sendRequest(readyUrl, restPath.METHOD, { body: options.body, params }))
            } catch(err) {
                s.error(err)
            }
        }).pipe(
            mergeMap((observer: Observable<ReturnType>) => observer)
        )
    }

    /**
     * @description Verify template URL path and replace template keys with assigned values
     * @param templateUrl template URL path
     * @param templateParams templates keys to be replacements
     * @param paramsValues values to replaces template keys
     */
    private parseTemplateUrl(templateUrl: string, templateParams: string[], paramsValues: {[key: string]: string}): string {
        this.verifyTemplateErrors(templateParams, paramsValues)
        return templateParams.reduce((p, c) => p.replace(`{${c}}`, paramsValues[c]), templateUrl)
    }

    /**
     * @description Verify template URL path 
     * @param templateParams templates keys to be replacements
     * @param paramsValues values to replaces template keys
     * @throws Error on invalid template params keys 
     */
    private verifyTemplateErrors(templateParams: string[] = [], paramsValues: {[key: string]: string} = {}): void|never {
        const differentLength = templateParams.length != Object.keys(paramsValues).length
        const differentArgs = !templateParams.every(p => p in paramsValues)
            
        if(differentLength || differentArgs) {
            throw Error('invalid template params keys')
        }
    }

    /**
     * @description Convert ```JSON``` into ```HTTP Query Params```
     * @param body ```JSON``` payload 
     */
    private parseQueryParams(body: RestJSON): HttpParams {
        const params = new HttpParams()
        for(const [k, v] of Object.entries(body)) {
            params.set(k, v as string)
        }
        return params
    }

    /**
     * @param url server endpoint path
     * @param method ```GET```, ```POST```, ```PUT```, ```PATCH```, ```DELETE```
     * @param payload ```JSON``` on ```POST```, ```PUT```, ```PATCH``` or ```HTTP Query Params``` on ```GET```, ```DELETE```
     * @throws Error on unhandled HTTP method
     */
    private sendRequest(url: string, method: string, 
        payload: { body?: RestJSON, params?: HttpParams}): Observable<any>|never {
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