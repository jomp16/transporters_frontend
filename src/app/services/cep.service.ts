import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transporter } from '../domain/transporter';
import {CepResponse} from '../domain/cepresponse';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private url = 'https://transporters.rwx.ovh';

  constructor(private http: HttpClient) {
  }

  locateCep(cep: string): Observable<CepResponse> {
    return this.http.get<CepResponse>(`${this.url}/api/v1/cep/locate/${cep}`);
  }
}
