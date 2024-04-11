import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DonationCenterDTO } from "../../../models";

@Injectable({
  providedIn: 'root'
})
export class DonationCenterService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<DonationCenterDTO[]>('api/donationCenter');
  }

  getAllFilteredBy(json: any) {
    return this.http.get<DonationCenterDTO[]>('api/donationCenter/filteredBy', { params: json });
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
