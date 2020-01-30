import { Observable } from 'rxjs';

// To invoke the Observable and see these values, we need to subscribe to it:

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next(x) { console.log('got value ' + x); },
    error(err) { console.error('something wrong occurred: ' + err); },
    complete() { console.log('done'); }
});
console.log('just after subscribe');

// It is a good idea to wrap any code in subscribe with try/catch block 
// that will deliver an Error notification if it catches an exception:

import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
    try {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
    } catch (err) {
        subscriber.error(err); // delivers an error if it caught one
    }
});
