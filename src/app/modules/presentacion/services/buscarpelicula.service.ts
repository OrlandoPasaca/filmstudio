import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscarpeliculaService {

  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";

  constructor(private http:HttpClient) { }

  buscarPelicula(id)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${BuscarpeliculaService.api_key}&language=es-ES`)
  }
  getCredits(id)
  {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${BuscarpeliculaService.api_key}&language=es-ES`)
  }
}
