import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnrolmentModel, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'users/';

  getUsers() {
    return this.http.get<UserModel[]>(`${this.apiUrl}`);
  }

  getUserById(id: string) {
    return this.http.get<UserModel>(`${this.apiUrl}${id}`);
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
    return this.http.get<EnrolmentModel[]>(`${this.apiUrl}${userId}/enrolments`);
  }

  addEnrolment(userId: string, sessionId: string) {
    return this.http.post(`${this.apiUrl}${userId}/enrolments`, { userId, sessionId });
  }

  removeEnrolment(userId: string, sessionId: string) {
    return this.http.delete(`${this.apiUrl}${userId}/enrolments/${sessionId}`);
  }

  getUsersBySessionEnrolments(sessionId: string) {
    return this.http.get<UserModel[]>(`${this.apiUrl}session/${sessionId}/enrolments`);
  }

  getUsersBySessionAttendances(sessionId: string) {
    return this.http.get<UserModel[]>(`${this.apiUrl}session/${sessionId}/attendances`);
  }
}
