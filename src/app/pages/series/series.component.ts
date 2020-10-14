import { Component, OnInit,AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import { BuscarSerieService } from './services/buscarserie.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  id;
  name;
  descripcion;
  n_temporadas;
  backdrop_path;
  generos;
  created_by;
  seasons;
  temporada=1;
  constructor(private route:ActivatedRoute,private service:BuscarSerieService,private router:Router,private cdRef:ChangeDetectorRef) 
  { 
    if(this.route.firstChild)
    this.route.firstChild.paramMap.subscribe((res:any)=>
      {
        if(res.params.temporada)
        {
        this.temporada=res.get("temporada");
        }
      })
  }

  ngOnInit(): void {
  }
  ngAfterViewChecked()
  {
    if(this.route.firstChild)
    this.route.firstChild.paramMap.subscribe((res:any)=>
      {
        if(res.params.temporada)
        {
        this.temporada=res.get("temporada");
        }
      })
      this.cdRef.detectChanges();
  }


}
