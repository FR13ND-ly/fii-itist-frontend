import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {
  http = inject(HttpClient);
  apiUrl = environment.apiUrl + 'scanner';

  resolveCode(data: any) {
    return this.http.post(`${this.apiUrl}/resolve`, data);
  }
}
