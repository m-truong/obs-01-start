import { Component, OnInit, OnDestroy } from '@angular/core';

// import interval method
import { interval, Subscription } from 'rxjs'

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
    interval(1000).subscribe(count => {
    })

    // Note: to prevent 'memory-leaks' must always unsubscribe() from observables() that continue to emit data
    // note: some observables emit data once
    // note: observables that are not unsubscribed() from will cause a memory leak - cause they continue to emit data
    // this .subscribe() ==> will return a <Subscription> type
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count)
    })
  }

  ngOnDestroy(): void {
    // by clearing all the subscriptions prevents memory leaks
      this.firstObsSubscription.unsubscribe();
  }
}
