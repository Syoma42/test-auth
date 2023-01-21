import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized(): boolean {
    return localStorage.getItem('login') !== null;
  }
}
