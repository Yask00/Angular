
var button = document.querySelector('button');

var obs1 = Rx.Observable.fromEvent(button, 'click');
var obs2 = Rx.Observable.interval(1000);

obs1.switchMap(
    event => {
        return obs2
    }
).subscribe(
    (value) => console.log(value)
);

