import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuscartemporadaService } from './services/buscartemporada.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-temporada',
  templateUrl: './temporada.component.html',
  styleUrls: ['./temporada.component.css']
})
export class TemporadaComponent implements OnInit {

  id;
  temporada;
  episodes;
  still_path;
  seasons;
  forma:FormGroup;
  constructor(private route:ActivatedRoute,
              private service:BuscartemporadaService,
              private fb:FormBuilder,
              private router:Router) 
  {
    this.route.parent.parent.paramMap
    .subscribe(params=>
      {
        this.id=params.get("id");
        this.buscar()
        this.crearForm();
        this.onValueChanges();
      })
    this.route.paramMap
    .subscribe(params =>
        {
          this.temporada=params.get("temporada");
          this.buscarTemporada();
          this.crearForm();
          this.onValueChanges();
        });
   }

  ngOnInit(): void {
    this.buscar();
  }
  crearForm()
  {
    this.forma=this.fb.group(
      {
        temporada:[this.temporada]
      }
    )
  }
  onValueChanges()
  {
    this.forma.valueChanges
    .subscribe((res:any)=>
      {
        this.router.navigate([`serie/${this.id}/temporada/${res.temporada}`])
      });
  }
  buscarTemporada()
  {
    this.service.buscarTemporada(this.id,this.temporada)
    .subscribe((res:any)=>
      {
        this.episodes=res.episodes;
        this.still_path=`url(https://image.tmdb.org/t/p/w500/${res.still_path})`;
      },
      error=>
      {
        if(error.status==404)
        {
        console.log("regresa al home")
        }
      });
  }
  buscar()
  {
    this.service.buscarSerie(this.id).
    subscribe((res:any)=>
    {
      this.seasons=res.seasons;
      this.buscarTemporada();
    });
  }

}
