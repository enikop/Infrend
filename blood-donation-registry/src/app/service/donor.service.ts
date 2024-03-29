import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DonorDTO } from '../models/dto';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  private changeSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  private notifyChange() {
    this.changeSubject.next();
  }

  getChangeSubject(){
    return this.changeSubject;
  }

  getAll() {
     return this.http.get<DonorDTO[]>('api/donor');
  }

  getOne(id: number) {
    return this.http.get<DonorDTO>('api/donor/' + id);
  }

  create(donor: DonorDTO) {
    return this.http.post<DonorDTO>('api/donor', donor).pipe(
      tap(() => this.notifyChange())
    );
  }

  update(donor: DonorDTO) {
    return this.http.put<DonorDTO>('api/donor', donor).pipe(
      tap(() => this.notifyChange())
    );
  }
  /*
  delete(id: number) {
    return this.http.delete('api/donor/' + id);
  }*/
}
