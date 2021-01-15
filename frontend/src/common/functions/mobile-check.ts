import { fromEvent, Observable } from 'rxjs';

function testSizes(): boolean {
    return window.innerWidth < 769 ? true : false;
}

/**
 * @description Check if page is in mobile sizes
 */
export function isMobile(): Observable<boolean> {
    return new Observable(s => {
        let value = testSizes();
        s.next(value);

        const sub = fromEvent(window, 'resize')
            .subscribe(() => {
                const c = testSizes();
                if (c !== value) {
                    value = c;
                    s.next(value);
                }
            });

        return () => sub.unsubscribe();
    })
}
