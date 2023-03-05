import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // note: whatever route the User component is initialized on ... it subscribes to the observable from the Routes module
    // and then sets the current this.id to the params.id
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
