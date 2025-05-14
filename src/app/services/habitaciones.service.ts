import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Habitacion {
  nombre: string;
  descripcion: string;
  imagen: string;
  tipo: string;
  precio:number;
}

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  private apiUrl = 'https://oswaldo-hotel3.free.beeceptor.com';

  constructor(private http: HttpClient) {}

  obtenerHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }
}
