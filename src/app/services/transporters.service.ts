import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporter } from '../domain/transporter';



@Injectable({
  providedIn: 'root'
})
export class TransportersService {

  private url = 'https://transporters.rwx.ovh';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Transporter[]> {
    return this.http.get<Transporter[]>(`${this.url}/api/v1/transporters/list`);
  }

  findTransporterById(id: bigint): Observable<Transporter> {
    return this.http.get<Transporter>(`${this.url}/api/v1/transporters/get/${id}`);
  }

  createTransporter(transporter: Transporter): Observable<Transporter> {
    return this.http.post<Transporter>(`${this.url}/api/v1/transporters/add`, transporter);
  }

  updateTransporter(transporter: Transporter): Observable<Transporter> {
    return this.http.put<Transporter>(`${this.url}/api/v1/transporters/update/${transporter.id}`, transporter);
  }

  deleteTransporterById(id: bigint) {
    this.http.delete(`${this.url}/api/v1/transporters/delete/${id}`);
  }
}
