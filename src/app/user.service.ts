import { EventEmitter, Injectable } from "@angular/core";


@Injectable({providedIn: 'root'})
export class UserService {

  // this is a field on every instance of the UserService
  // it'll emit an event -> that every other angular component will listen to as an observable
  activatedEmitter = new EventEmitter<boolean>();
}