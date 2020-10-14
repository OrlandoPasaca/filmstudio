import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchServiceService {

  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";
  constructor(private http:HttpClient) { }
  buscarUrlsSerie(id_tmdb,temporada,capitulo)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/buscar/url-serie.php?id_tmdb=${id_tmdb}&temporada=${temporada}&capitulo=${capitulo}`);
  }
  buscarUrlsPelicula(id_tmdb)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/buscar/movie.php?id_tmdb=${id_tmdb}`);
  }
  buscarTemporadas(id_tmdb)
  {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id_tmdb}?api_key=${WatchServiceService.api_key}&language=es-ES`);
  }
  buscarCapitulos(id_tmdb,temporada)
  {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id_tmdb}/season/${temporada}?api_key=${WatchServiceService.api_key}&language=es-ES`);
  }
  detailsMovie(id_tmdb)
  {
   return this.http.get(`https://api.themoviedb.org/3/movie/${id_tmdb}?api_key=${WatchServiceService.api_key}&language=es-ES`);
  }
  detailsCap(id_tmdb,temporada,capitulo)
  {
   return this.http.get(`https://api.themoviedb.org/3/tv/${id_tmdb}/season/${temporada}/episode/${capitulo}?api_key=${WatchServiceService.api_key}&language=es-ES`);
  }
}
