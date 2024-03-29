import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonationCenterDTO } from '../models/dto';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationCenterService {

  private changeSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  private notifyChange() {
    this.changeSubject.next();
  }

  getChangeSubject(){
    return this.changeSubject;
  }

  getAll() {
    return this.http.get<DonationCenterDTO[]>('api/donationCenter');
  }

  getOne(id: number) {
    return this.http.get<DonationCenterDTO>('api/donationCenter/' + id);
  }

  create(center: DonationCenterDTO) {
    return this.http.post<DonationCenterDTO>('api/donationCenter', center).pipe(
      tap(() => this.notifyChange())
    );
  }

  update(center: DonationCenterDTO) {
    return this.http.put<DonationCenterDTO>('api/donationCenter', center).pipe(
      tap(() => this.notifyChange())
    );
  }

  /*delete(id: number) {
    return this.http.delete('api/donationCenter/' + id);
  }*/
}
