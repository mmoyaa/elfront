import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plato {
  id: number;
  nombre: string;
  ingrediente1: string;
  ingrediente2: string;
  ingrediente3: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegionesService {

  private apiUrl = 'http://localhost:3000/regiones';

  constructor(private http: HttpClient) {}

  // getRegiones(): Observable<Regiones[]> {
  //   return this.http.get<Plato[]>(this.apiUrl);
  // }
}




