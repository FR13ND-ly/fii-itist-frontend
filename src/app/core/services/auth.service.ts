import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { jwtDecode } from "jwt-decode";
import { userActions } from '../../state/user/user.actions';
import { isPlatformBrowser } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private store = inject(Store);
  platformId = inject(PLATFORM_ID)

  auth = inject(Auth)
  http = inject(HttpClient);
  apiUrl = environment.apiUrl

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.authorization()
    }
  }

  GoogleAuth() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
  }

  signUp(data: any) {
    return this.http.post(`${this.apiUrl}auth/sign-up`, data)
  }

  authentification(data: any) {
    return this.http.post(`${this.apiUrl}auth/sign-in`, data.loginCredentials).pipe(tap((response: any) => {
      this.router.navigate(['/']);
      localStorage.setItem('jwt', response.token);
      const decoded = jwtDecode(response.token);
      this.store.dispatch(userActions.loginSuccess({ user: decoded }));
    }));
  }

  authorization() {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = localStorage.getItem("jwt") || '';
    try {
      if (token === '') return
      const decoded = jwtDecode(token);
      this.store.dispatch(userActions.loginSuccess({ user: decoded }));
    } catch (error: any) {
      console.error("Invalid token:", error.message);
    }
  }
  
  getUserData(): any {
    if (!isPlatformBrowser(this.platformId)) return {};
    const token = localStorage.getItem("jwt") || '';
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error: any) {
      console.error("Invalid token:", error.message);
    }
    return {}
  }

  logout() {
    localStorage.setItem('jwt', '');
    location.href = '/';
  }
}
