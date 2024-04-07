import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DonationDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  http = inject(HttpClient);

  getAll() {
     return this.http.get<DonationDTO[]>('api/donation');
  }

  getAllFiltered(filters: any) {
    return this.http.get<DonationDTO[]>('api/donation/filteredBy', {params: filters});
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
