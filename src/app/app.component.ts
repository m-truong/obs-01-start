import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // this is internal state that is a 'feature-flag'
  // this internal state of the user-service will toggle and is DEPENDENT on the UserService injection
  userActivated = false;
  
  // use the UserService and listen for the emitted event
  constructor(private userService: UserService) {}

  // always add any injectables to the initializing life-hook
  ngOnInit() {
    this.userService.activatedEmitter.subscribe( didActivate => {
      this.userActivated = didActivate
    })
  }
}
