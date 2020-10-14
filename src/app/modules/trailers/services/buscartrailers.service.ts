import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscartrailersService {

  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";
  constructor(private http:HttpClient) { }
  buscarTrailers(id,categoria,idioma)
  {
   if(categoria=="serie")
   return this.http.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${BuscartrailersService.api_key}&language=es-${idioma}`);
   else if(categoria=="pelicula")
   return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${BuscartrailersService.api_key}&language=es-${idioma}`);
  }
}
