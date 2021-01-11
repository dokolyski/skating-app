import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

export function isMobile(): Observable<boolean> {
    const test = () => window.innerWidth < 769 ? true : false;
    let value = test();
    const s = new BehaviorSubject<boolean>(value);

    fromEvent(window, 'resize').subscribe(() => {
        const c = test();
        if(c !== value) {
            value = c;
            s.next(value);
        }
    });

    return s;
}
