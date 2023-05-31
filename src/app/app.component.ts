import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


  // always store a subscription as a value on the component instance
  private activatedSub: Subscription;

  // this is internal state that is a 'feature-flag'
  // this internal state of the user-service will toggle and is DEPENDENT on the UserService injection
  userActivated = false;
  
  // use the UserService and listen for the emitted event
  constructor(private userService: UserService) {}

  // always add any injectables to the initializing life-hook
  ngOnInit() {
    // any subscribe to an async-emitted Observable/Promise cann be returned and stored

    this.activatedSub = this.userService.activatedEmitter.subscribe( didActivate => {
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
