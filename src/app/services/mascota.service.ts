import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mascota } from '../interfaces/mascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private AppUrl: string = environment.endpoint;
  private ApiUrl: string = 'api/Mascota/';

  constructor(private http: HttpClient) { }

    getMascotas(): Observable<Mascota[]> {
     return this.http.get<Mascota[]>(`${this.AppUrl}${this.ApiUrl}`); 
    }

    getMascota(id: number): Observable<Mascota>{
      return this.http.get<Mascota>(`${this.AppUrl}${this.ApiUrl}${id}`); 
    }
    borrarMascota(id: number): Observable<void>{
      return this.http.delete<void>(`${this.AppUrl}${this.ApiUrl}${id}`);
    }

    agregarMascota(mascota: Mascota): Observable<Mascota>{
      return this.http.post<Mascota>(`${this.AppUrl}${this.ApiUrl}`, mascota); 
    }
    
    UpdateMascota(id: number, mascota: Mascota): Observable<void>{
      return this.http.put<void>(`${this.AppUrl}${this.ApiUrl}${id}`, mascota);
    }
  }

