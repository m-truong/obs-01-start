import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  // after creating the user-service ~ then must provide inside the components constructor
  constructor(private route: ActivatedRoute, private userServ: UserService) {
  }

  ngOnInit() {
    // note: whatever route the User component is initialized on ... it subscribes to the observable from the Routes module
    // and then sets the current this.id to the params.id
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  // handler method inside the userComponent logic file that'll execute onActivate() once button IS CLICKED
  // and it'll utilize the UserService's eventEmitter
}
