import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'users/';

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}${id}`);
  }
  
  sendVerificationEmail(email: string) {
    return this.http.post(`${this.apiUrl}send-verify`, { email });
  }

  verifyEmail(data: any) {
    return this.http.post(`${this.apiUrl}verify-email`, data);
  }

  updateUser(id: string, data: any) {
    return this.http.put(`${this.apiUrl}${id}`, data);
  }

  getEnrolments(userId: string) {
    return this.http.get(`${this.apiUrl}${userId}/enrolments`);
  }

  addEnrolment(userId: string, sessionId: string) {
    return this.http.post(`${this.apiUrl}${userId}/enrolments`, { userId, sessionId });
  }

  removeEnrolment(userId: string, sessionId: string) {
    return this.http.delete(`${this.apiUrl}${userId}/enrolments/${sessionId}`);
  }
}
