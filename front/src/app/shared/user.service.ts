import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullname: '',
    email: '',
    password: '',
  };
  constructor(private http: HttpClient) { }

  noAuthHeader = {headers: new HttpHeaders({ noauth: 'True'})};
  // MLHeader = {headers: new HttpHeaders({Authorization: 'Token 74792b69aa6f8594a31fb07a2b3eaa7998802f7f'})};
  // http methods
  postUser(user: User) {
    // return this.http.post(environment.apiBaseUrl + '/register', user);
    return this.http.post('http://localhost:3000/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post('http://localhost:3000/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get('http://localhost:3000/userProfile');
  }

  // helper methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayLoad() {
    const token = localStorage.getItem('token');
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayLoad();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
