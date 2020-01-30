// In the example below, we have two Observers attached to a Subject, 
// and we feed some values to the Subject:

import { Subject } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
});

subject.next(1);
subject.next(2);

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2


//--------------------

// Since a Subject is an Observer, this also means you may provide a Subject as 
// the argument to the subscribe of any Observable, like the example below shows:

import { Subject, from } from 'rxjs';

const subject = new Subject<number>();

subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`)
});
subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`)
});

const observable = from([1, 2, 3]);

observable.subscribe(subject); // You can subscribe providing a Subject

// Logs:
// observerA: 1
// observerB: 1
// observerA: 2
// observerB: 2
// observerA: 3
// observerB: 3