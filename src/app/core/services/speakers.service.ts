import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SpeakerModel } from '../models/speaker.model';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'speakers'; 

  getSpeakers() {
    return this.http.get<SpeakerModel[]>(this.apiUrl);
  }

  addSpeaker(speaker: SpeakerModel) {
    return this.http.post(this.apiUrl, speaker);
  }

  updateSpeaker(id: string, speaker: SpeakerModel) {
    return this.http.put(`${this.apiUrl}/${id}`, speaker);
  }

  deleteSpeaker(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
