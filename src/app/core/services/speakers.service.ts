import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'speakers'; 

  getSpeakers() {
    return this.http.get(this.apiUrl);
  }

  addSpeaker(speaker: any) {
    return this.http.post(this.apiUrl, speaker);
  }

  updateSpeaker(id: string, speaker: any) {
    return this.http.put(`${this.apiUrl}/${id}`, speaker);
  }

  deleteSpeaker(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
