import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";

  constructor(private http:HttpClient) 
  { 

  }
  buscarDetallesPeliculas(id)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${CreditosService.api_key}&language=es-ES`)
  }
  buscarDetallesSeries(id)
  {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${CreditosService.api_key}&language=es-ES`)
  }
}
