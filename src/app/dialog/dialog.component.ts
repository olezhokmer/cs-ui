import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  messages: any[] = [];
  userId: number | null = null;
  profile: any = null;

  constructor(private route: ActivatedRoute, private appService : AppService,) { }

  ngOnInit(): void {
    const strVal = this.route.snapshot.paramMap.get('userId');
    this.userId = Number(strVal);

    if(localStorage.getItem("accesstoken")) {
      this.appService.getProfile().subscribe((data: any) => {
        this.profile = data.profile;

        if (this.userId && this.profile) {
          this.appService.getMessages(this.userId).subscribe((data: any) => {
            const dialogWith = data.response.user;

            this.messages = data.response.messages.map((msg: any) => {
              return {
                userId: msg.fromUserId,
                username: dialogWith.userId === msg.fromUserId ? dialogWith.username : this.profile.username,
                message: msg.message,
              }
            });
          });
        }
      });
    }
  }

  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.userId) {
      this.appService.sendMessage(this.userId, this.newMessage).subscribe((data) => {
        this.messages.push({
          userId: this.profile.userId,
          username: this.profile.username,
          message: this.newMessage,
        })
      });
    }
  }
}
