import { Component, OnInit, OnDestroy } from '@angular/core';

// import interval method
import { interval, Subscription } from 'rxjs'
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // Note: All angular observables get 'automationally' unsubscribed

  // always store your subscriptions
  private firstObsSubscription: Subscription;

  constructor() {
    console.log('[Home Ang Component]-[constructed]')
  }

  ngOnInit() {
    // note: angular projects are added as 'rxjs' observables
    // interval() returns an observable() then you can subscribe() to the observable
    // interval(1000).subscribe(count => {
    // })

    // Note: to prevent 'memory-leaks' must always unsubscribe() from observables() that continue to emit data
    // note: some observables emit data once
    // note: observables that are not unsubscribed() from will cause a memory leak - cause they continue to emit data
    // this .subscribe() ==> will return a <Subscription> type
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    // Custom observable example:
    
    const customIntervalObservable = Observable.create((observer) => {
      // seems to be the payload
      let count = 0; // this is the observable's payload?!

      // this increments the count every 1000ms
      setInterval( () => {
        observer.next(count);
        if (count === 2)
          observer.complete();
        // this causes an error thrown!
        if (count > 3) observer.error(new Error('Count is greater than 3!'))
        // once and observer callback f(x) encounters an error --- it stops emitting values

        count++;
      }, 1000);
    });

    // after storing the Created Observable to the customIntervalObservable 
    // then calling .subscribe() on it returns an RxJS 'subscription' which you set to the class field 'this.firstObsSubscription'

    this.firstObsSubscription = customIntervalObservable.subscribe( (data) => {
      console.log(data);
    }, (errorCallback) => { // note: by handling the error (it no longer appears 'Red')
      console.log(errorCallback);
      alert(errorCallback.message);
    }, () => {
      console.log('[Entered] the Completion callback for the NgRX subscription!')
    })
  }

  ngOnDestroy(): void {
    // by clearing all the subscriptions prevents memory leaks
      this.firstObsSubscription.unsubscribe();
  }
}
