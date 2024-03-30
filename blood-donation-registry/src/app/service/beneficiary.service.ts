import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeneficiaryDTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<BeneficiaryDTO[]>('api/beneficiary');
  }

  getOne(id: number) {
    return this.http.get<BeneficiaryDTO>('api/beneficiary/' + id);
  }

  create(beneficiary: BeneficiaryDTO) {
    return this.http.post<BeneficiaryDTO>('api/beneficiary', beneficiary);
  }

  update(beneficiary: BeneficiaryDTO) {
    return this.http.put<BeneficiaryDTO>('api/beneficiary', beneficiary);
  }
  /*
  delete(id: number) {
    return this.http.delete('api/beneficiary/' + id);
  }*/
}
