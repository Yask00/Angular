var subject = new Rx.Subject();

subject.subscribe({
    next: function (value) {
        console.log(value);
    },
    error: function (error) {
        console.log(error);
    },
    complete: function () {
        console.log('Complete');
    }
});

subject.subscribe({
    next: function (value) {
        console.log(value);
    }
});

subject.next('A new data piece');
subject.complete();
subject.next('New value');