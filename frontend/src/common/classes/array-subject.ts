import { ReplaySubject } from 'rxjs';
import * as cloneDeep from 'lodash.clonedeep';

export class ArraySubject<T> {
    private rowsSubject = new ReplaySubject<T[]>();
    readonly data$ = this.rowsSubject.asObservable();

    constructor(private data: T[] = []) {}

    getDataCopy(): T[] {
        return cloneDeep(this.data);
    }

    setIndex(data: T, index: number) {
        this.data[index] = data;
        this.rowsSubject.next(this.data);
    }

    getIndexCopy(index: number): T {
        return cloneDeep(this.data[index]);
    }

    deleteIndex(index: number) {
        this.data.splice(index, 1);
        this.rowsSubject.next(this.data);
    }

    setData(data: T[]) {
        this.data = data;
        this.rowsSubject.next(this.data);
    }

    setDataCopy(data: T[]) {
        this.setData(cloneDeep(data));
    }

    push(data: T) {
        this.data.push(data);
        this.rowsSubject.next(this.data);
    }

    findIndex(next: (v: T) => boolean) {
        return this.data.findIndex(next);
    }
}
