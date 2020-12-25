import { CONTEXT_NAME } from "@angular/compiler/src/render3/view/util"

export type LazyComponent<T> = {
    context: ThisType<T>,
    getComponentClass(): T
    callInit(): void
};

// tslint:disable-next-line: ban-types
export function transformToLazy<T extends Function>(componentClass: T): LazyComponent<T> {
    // tslint:disable-next-line: ban-types
    const ngOnInit: Function = componentClass.prototype.ngOnInit;
    componentClass.prototype.ngOnInit = () => { };
    let _context: ThisType<T>;

    return {
        getComponentClass: () => componentClass,
        callInit: () => ngOnInit.call(_context),
        set context(val: ThisType<T>) {
            _context = val;
        }
    };
}
