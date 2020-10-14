import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ServicemainService {

  private static readonly api_key:string="75122fd4c7296824ee90eb40c1d0f073";
  constructor(private http:HttpClient) 
  { }
  cargar_img_presentacion(pos)
  {
    return this.http.get(`https://www.hiddensoft.net/consultapresentacion.php/?buscar=${pos}`);
  }
  obtener_id(pos)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/main.api.php/?pos=${pos}`)
    .pipe(map(res=>
      {
       return {id:res[0].id_tmdb,categoria:res[0].categoria,temporada:res[0].numero_temporada,capitulo:res[0].numero_capitulo};
      }));
  }
  obtener_id_movie(pos)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/main-movie.api.php/?pos=${pos}`)
    .pipe(map(res=>
      {
       return {id:res[0].id_tmdb,categoria:res[0].categoria,temporada:res[0].numero_temporada,capitulo:res[0].numero_capitulo};
      }));
  }
  obtener_id_serie(pos)
  {
    return this.http.get(`https://hiddensoft.net/api_filmstudioSPA/main-serie.api.php/?pos=${pos}`)
    .pipe(map(res=>
      {
       return {id:res[0].id_tmdb,categoria:res[0].categoria,temporada:res[0].numero_temporada,capitulo:res[0].numero_capitulo};
      }));
  }
  cargar_img_presentacion2(id_categoria)
  {
    if(id_categoria.categoria=="pelicula")
    {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id_categoria.id}?api_key=${ServicemainService.api_key}&language=es-MX`)
    .pipe(map((res:any)=>
      {
        return {name:res.title,
                overview:res.overview,
                categoria:id_categoria.categoria,
                genres:res.genres,
                backdrop_path:res.backdrop_path,
                status:res.status};
      }));
    }
    else if(id_categoria.categoria=="serie")
    {
    return this.http.get(`https://api.themoviedb.org/3/tv/${id_categoria.id}?api_key=${ServicemainService.api_key}&language=es-MX`)
    .pipe(map((res:any)=>
      {
        return {name:res.name,
                overview:res.overview,
                categoria:id_categoria.categoria,
                genres:res.genres,
                backdrop_path:res.backdrop_path,
                status:res.status};
      }));
    }
  }
  
}
