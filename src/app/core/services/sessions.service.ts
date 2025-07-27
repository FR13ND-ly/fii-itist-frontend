import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SessionModel } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'sessions';

  getSessions() : Observable<SessionModel[]> {
    return this.http.get<SessionModel[]>(`${this.apiUrl}`);
  }

  getSession(id: string) {
    return this.http.get<SessionModel>(`${this.apiUrl}/${id}`);
  }

  addSession(session: any) {
    return this.http.post<SessionModel>(`${this.apiUrl}`, session);
  }

  updateSession(id: string, session: any) {
    return this.http.put<SessionModel>(`${this.apiUrl}/${id}`, session);
  }

  deleteSession(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTimeSlots() {
    return this.http.get(`${this.apiUrl}/time-slots`);
  }

  addTimeSlot(timeSlot: any) {
    return this.http.post(`${this.apiUrl}/time-slots`, timeSlot);
  }

  updateTimeSlot(id: string, timeSlot: any) {
    return this.http.put(`${this.apiUrl}/time-slots/${id}`, timeSlot);
  }

  deleteTimeSlot(id: string) {
    return this.http.delete(`${this.apiUrl}/time-slots/${id}`);
  }

  getHalls() {
    return this.http.get(`${this.apiUrl}/halls`);
  }

  addHall(hall: any) {
    return this.http.post(`${this.apiUrl}/halls`, hall);
  }

  updateHall(id: string, hall: any) {
    return this.http.put(`${this.apiUrl}/halls/${id}`, hall);
  }

  deleteHall(id: string) {
    return this.http.delete(`${this.apiUrl}/halls/${id}`);
  }

  getSessionsByUserEnrolments(userId: string) {
    return this.http.get<SessionModel[]>(`${this.apiUrl}/user/${userId}/enrolments`);
  }

  getSessionsByUserAttendances(userId: string) {
    return this.http.get<SessionModel[]>(`${this.apiUrl}/user/${userId}/attendances`);
  }
}
