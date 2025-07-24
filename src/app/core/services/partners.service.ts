import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'partners';

  getPartners() {
    return this.http.get(`${this.apiUrl}`);
  }

  addPartner(partner: any) {
    return this.http.post(`${this.apiUrl}`, partner);
  }

  updatePartner(id: string, partner: any) {
    return this.http.put(`${this.apiUrl}/${id}`, partner);
  }

  deletePartner(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
