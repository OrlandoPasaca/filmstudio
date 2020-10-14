import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { CreditosService } from './services/creditos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id;
  categoria;
  cast;
  jobs_crew=[];
  crew=[];
  all_crew;
  constructor(private route:ActivatedRoute,private service:CreditosService) 
  {
    this.categoria=route.parent.parent.parent.snapshot.url[0].path;
    route.parent.parent.paramMap.subscribe(params=>
      {
        if(this.categoria)
        {
          this.id=params.get("id");
          this.getCredits();
        }
      });    
  }

  ngOnInit(): void {
  }
  getCredits()
  {
    if(this.categoria=="pelicula")
    this.service.buscarDetallesPeliculas(this.id)
    .subscribe((res:any)=>
      {
        while(res.cast.length>20)
        {
          res.cast.pop();
        }
        this.cast=res.cast;
        while(res.crew.length>20)
        {
          res.crew.pop();
        }
        this.all_crew=res.crew;
        this.getJobsCrew()
      })
    else if(this.categoria=="serie")
    this.service.buscarDetallesSeries(this.id)
    .subscribe((res:any)=>
      {
        while(res.cast.length>20)
        {
          res.cast.pop();
        }
        this.cast=res.cast;
        while(res.crew.length>20)
        {
          res.crew.pop();
        }
        this.all_crew=res.crew;
        this.getJobsCrew()
      })
  }

  getJobsCrew()
  {
    this.jobs_crew=this.all_crew.map(res=>res.job)
    this.jobs_crew=[...new Set(this.jobs_crew)]
    this.jobs_crew.forEach(element => {
      const crews=this.all_crew.filter(res=>res.job==element);
        this.crew.push([...crews]);
    });
  }
}
