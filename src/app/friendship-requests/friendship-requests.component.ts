import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-friendship-requests',
  templateUrl: './friendship-requests.component.html',
  styleUrls: ['./friendship-requests.component.css']
})
export class FriendshipRequestsComponent {
  friends: any = null;
  constructor(
    private appService : AppService,
    private eventsService : EventsService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("accesstoken")) {
      this.appService.getFriendRequests().subscribe((data: any) => {
        this.friends= data.profiles;
      });
    }
  }

  acceptFriend(friendId: number) {
    this.appService.acceptFriend(friendId).subscribe((data: any) => {
      alert(data.message);

      this.appService.getFriendRequests().subscribe((data: any) => {
        this.friends= data.profiles;
      });
    }, (error) => {});
  }
}
