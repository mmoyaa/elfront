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
  providedIn: 'root',
})
export class PlatosService {
  private apiUrl = 'http://localhost:3000/platos';

  constructor(private http: HttpClient) {}

  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }
}
