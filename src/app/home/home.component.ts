import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  profile : any = null;
  possibleFriends: any = null;
  allUsers: any = null;
  constructor(
    private appService : AppService,
    private eventsService : EventsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("accesstoken")) {
      this.appService.getProfile().subscribe((data: any) => {
        this.profile = data.profile;

        this.appService.getPossibleFriends().subscribe((data: any) => {
          this.possibleFriends = data.possibleFriends;
        });
      });
    } else {
      this.appService.getAllUsers().subscribe((data: any) => {
        this.allUsers = data.profiles;
      });
    }
    this.eventsService.authEmitter.subscribe((profile) => {
      this.profile = profile;
    });
  }

  sendFriendshipRequest(userId: number) {
    this.appService.sendFriendshipRequest(userId).subscribe((data: any) => {
      alert(data.message);
    }, (error) => { alert(error.error.Message)})
  }
}
