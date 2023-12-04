import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(
    private appService : AppService,
    private eventsService : EventsService,
    private router : Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    pass: new FormControl(''),
  });
  loginSubmit() : void {
    const payload = {
      Username: this.loginForm.value.login,
      Password: this.loginForm.value.pass,
    };
    this.appService.signUp(payload)
    .subscribe((data: any) => {
      localStorage.setItem("accesstoken", String(data.token));

      this.appService.getProfile()
      .subscribe((response: any) => {
        this.eventsService.authEmitter.emit(response.profile);
        this.router.navigate(['/']);
      }, (error) => {});
    }, (error) => {alert(error.error.Message)});
  }
}
