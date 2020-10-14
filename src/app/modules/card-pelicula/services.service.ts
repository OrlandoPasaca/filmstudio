import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";
  constructor(private http:HttpClient) { }
  obtener_peli_slider(limit,tipo_slider)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/card_pelicula/?pos=${limit}&tipo=${tipo_slider}`);
  }
  obtener_data_peli(id,categoria,temporada)
  {
    if(categoria=="serie")
    return this.http.get(`https://api.themoviedb.org/3/tv/${id}/season/${temporada}?api_key=${ServicesService.api_key}&language=en-ES`)
           .pipe(map((res:any)=>
            {
              return res.poster_path;
            }));
    else if(categoria=="pelicula")
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=75122fd4c7296824ee90eb40c1d0f073&language=es-MX`)
           .pipe(map((res:any)=>
            {
              return res.poster_path;
            }))
  }
}
