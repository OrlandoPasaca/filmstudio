import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-card-pelicula',
  templateUrl: './card-pelicula.component.html',
  styleUrls: ['./card-pelicula.component.css']
})
export class CardPeliculaComponent implements OnInit {

  @Input() limit:number;
  @Input() tipo_slider:string;
  poster_path:string;
  id_tmdb:number;
  nombre:string;
  temporada:number;
  capitulo:number;
  categoria:string;
  background:boolean=false;
  constructor(private service:ServicesService) {
    
   }

  ngOnInit(): void {
    this.obtener_peli_card();
  }
  async obtener_peli_card()
  {
    const pelicula:any=await this.service.obtener_peli_slider(this.limit,this.tipo_slider).toPromise();
    this.nombre=pelicula.nombre_pelicula;
    this.temporada=pelicula.numero_temporada;
    this.capitulo=pelicula.numero_capitulo;
    this.categoria=pelicula.categoria;
    this.id_tmdb=pelicula.id_tmdb;
    this.service.obtener_data_peli(pelicula.id_tmdb,pelicula.categoria,pelicula.numero_temporada)
    .subscribe(res=>
      {
        this.poster_path=`url(https://image.tmdb.org/t/p/w500/${res})`;
      });
  }

}
