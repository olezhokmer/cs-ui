import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends: any = null;
  constructor(
    private appService : AppService,
    private eventsService : EventsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("accesstoken")) {
      this.appService.getFriends().subscribe((data: any) => {
        this.friends= data.profiles;
      });
    }
  }
}
