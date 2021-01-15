import { ReplaySubject } from 'rxjs';
import * as cloneDeep from 'lodash.clonedeep';

/**
 * @description Notify on array sub-elements changing
 * 
 */
export class ArraySubject<T> {
    private subject = new ReplaySubject<T[]>();
    readonly data$ = this.subject.asObservable();

    constructor(private data: T[] = []) {}

    getDataCopy(): T[] {
        return cloneDeep(this.data);
    }

    setIndex(data: T, index: number) {
        this.data[index] = data;
        this.subject.next(this.data);
    }

    getIndexCopy(index: number): T {
        return cloneDeep(this.data[index]);
    }

    deleteIndex(index: number) {
        this.data.splice(index, 1);
        this.subject.next(this.data);
    }

    setData(data: T[]) {
        this.data = data;
        this.subject.next(this.data);
    }

    setDataCopy(data: T[]) {
        this.setData(cloneDeep(data));
    }

    push(data: T) {
        this.data.push(data);
        this.subject.next(this.data);
    }

    findIndex(next: (v: T) => boolean) {
        return this.data.findIndex(next);
    }
}
