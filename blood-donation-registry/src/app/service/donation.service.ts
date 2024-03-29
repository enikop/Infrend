import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<DonationDTO[]>('api/donation');
  }

  getOne(id: number) {
    return this.http.get<DonationDTO>('api/donation/' + id);
  }

  create(donation: DonationDTO) {
    return this.http.post<DonationDTO>('api/donation', donation);
  }

  /*update(donation: DonationDTO) {
    return this.http.put<DonationCenterDTO>('api/donation', donation);
  }

  delete(id: number) {
    return this.http.delete('api/donation/' + id);
  }*/
}
