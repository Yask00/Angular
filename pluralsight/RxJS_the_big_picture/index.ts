import { Observable, from, fromEvent } from 'rxjs';
import { pluck, timeInterval, map } from 'rxjs/operators';

let clicks$ = fromEvent(document, 'click');

clicks$
  .pipe(
    pluck('clientX'), // get single value from object
    timeInterval(), // Object w props TimeInterval {value:354235, interval: 325}
    map(clickInfo => `${clickInfo.interval / 1000} seconds (${clickInfo.value})`)
  )
  .subscribe(
    (value) => console.log(value),
    (err) => console.log(`ERROR: ${err}`),
    () => console.log('All done.')
  );





let nums = [2, 4, 6, 9, 10];

// let evenNumbers$ = from(nums);

let evenNumbers$ = Observable.create(subscriber => {

  for (let currentNum of nums) {
    if (currentNum % 2 === 0) {
      subscriber.next(currentNum);
    }
    else {
      subscriber.error('Value is not even.'); // stops executing
    }
  }

  subscriber.complete();
  
});

evenNumbers$.subscribe(
  (value) => console.log(value), // next
  (err) => console.log(`ERROR: ${err}`), // error
  () => console.log('All done.')  // complete
);