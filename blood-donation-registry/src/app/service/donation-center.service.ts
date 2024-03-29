import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationCenterDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class DonationCenterService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<DonationCenterDTO[]>('api/donationCenter');
  }

  getOne(id: number) {
    return this.http.get<DonationCenterDTO>('api/donationCenter/' + id);
  }

  create(center: DonationCenterDTO) {
    return this.http.post<DonationCenterDTO>('api/donationCenter', center);
  }

  update(center: DonationCenterDTO) {
    return this.http.put<DonationCenterDTO>('api/donationCenter', center);
  }

  /*delete(id: number) {
    return this.http.delete('api/donationCenter/' + id);
  }*/
}
