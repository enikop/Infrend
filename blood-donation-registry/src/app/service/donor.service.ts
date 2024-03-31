import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DonorDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  http = inject(HttpClient);

  getAll() {
     return this.http.get<DonorDTO[]>('api/donor');
  }

  getOne(id: number) {
    return this.http.get<DonorDTO>('api/donor/' + id);
  }

  create(donor: DonorDTO) {
    return this.http.post<DonorDTO>('api/donor', donor);
  }

  update(donor: DonorDTO) {
    return this.http.put<DonorDTO>('api/donor', donor);
  }
  /*
  delete(id: number) {
    return this.http.delete('api/donor/' + id);
  }*/
}
