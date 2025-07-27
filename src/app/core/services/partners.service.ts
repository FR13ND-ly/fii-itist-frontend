import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PartnerModel } from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'partners';

  getPartners() {
    return this.http.get<PartnerModel[]>(`${this.apiUrl}`);
  }

  addPartner(partner: PartnerModel) {
    return this.http.post(`${this.apiUrl}`, partner);
  }

  updatePartner(id: string, partner: PartnerModel) {
    return this.http.put(`${this.apiUrl}/${id}`, partner);
  }

  deletePartner(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
