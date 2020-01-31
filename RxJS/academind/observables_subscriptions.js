var button = document.querySelector('button');

Rx.Observable.fromEvent(button, 'click')
    .subscribe(
        (value) => console.log(value.clientX)
    );

// -------------------------
var observer = {
    next: function (value) {
        console.log(value);
    },
    error: function (error) {
        console.log(error);
    },
    complete: function () {
        console.log('Completed');
    }
};

//Rx.Observable.fromEvent(button, 'click')
var subscription = Rx.Observable.create(function (obs) {
    //obs.next('A value');
    //obs.error('Error');
    //setTimeout(function() {
    //	obs.complete();
    //  obs.next('A second value');
    //}, 2000);
    button.onclick = function (event) {
        obs.next(event);
    }
})
    .subscribe(observer);

setTimeout(function () {
    subscription.unsubscribe();
}, 5000);