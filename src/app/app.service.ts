import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl: string = 'http://localhost:5000';
  constructor(private http: HttpClient) { }
  getHeaders(){
    return new HttpHeaders({
      "Authorization" : "Bearer " + String(localStorage.getItem("accesstoken"))
    });
  }

  login(form: { Username: string, Password: string }) {
    return this.http.post(this.apiUrl + '/users',  form );
  }
  signUp(form: { Username: string, Password: string }) {
    return this.http.put(this.apiUrl + '/users',  form );
  }
  getProfile() {
    return this.http.get(this.apiUrl + '/users', { headers: this.getHeaders() });
  }
  getPossibleFriends() {
    return this.http.get(this.apiUrl + '/friendship/possible-friends', { headers: this.getHeaders() });
  }

  getAllUsers() {
    return this.http.get(this.apiUrl + '/users/all');
  }

  sendFriendshipRequest(toUserId: number) {
    return this.http.put(this.apiUrl + '/friendship', { toUserId }, { headers: this.getHeaders() });
  }

  getFriends() {
    return this.http.get(this.apiUrl + '/friendship', { headers: this.getHeaders() });
  }

  getFriendRequests() {
    return this.http.get(this.apiUrl + '/friendship/requests', { headers: this.getHeaders() });
  }

  acceptFriend(friendId: number) {
    return this.http.patch(this.apiUrl + '/friendship', { friendId }, { headers: this.getHeaders() });
  }

  sendMessage(to: number, Message: string) {
    return this.http.put(this.apiUrl + '/messages', { to, Message }, { headers: this.getHeaders() });
  }

  getMessages(userId: number) {
    return this.http.get(this.apiUrl + '/messages/' + userId.toString(), { headers: this.getHeaders() });
  }
}
