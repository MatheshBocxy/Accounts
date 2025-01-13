import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AthuServiceService {

  constructor() { }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // logout(): void {
  //   // sessionStorage.removeItem('token');
  //   sessionStorage.clear();
  //   console.log('User has been logged out, token cleared from session storage');
  // }
}
