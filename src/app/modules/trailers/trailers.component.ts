import { Component, OnInit } from '@angular/core';
import { BuscartrailersService } from './services/buscartrailers.service';
import { ActivatedRoute,Router, UrlSegment } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-trailers',
  templateUrl: './trailers.component.html',
  styleUrls: ['./trailers.component.css']
})
export class TrailersComponent implements OnInit {

  id;
  trailers;
  categoria;
  constructor(private service:BuscartrailersService,private route:ActivatedRoute,private sanitizer:DomSanitizer,private router:Router) 
  { 
    this.route.parent.parent.paramMap
    .subscribe(params=>
    {
      this.id=params.get("id");
      if(this.categoria)
      this.buscarTrailers()
    });
    this.route.parent.parent.parent.url
    .subscribe((res:any)=>
    {
      this.categoria=res[0].path;
      if(this.id)
      this.buscarTrailers()
    });
  }

  ngOnInit(): void {
  }
  async buscarTrailers()
  {
    let res:any= await this.service.buscarTrailers(this.id,this.categoria,"MX").toPromise();
    if(res.results.length==0)
    {
    res= await this.service.buscarTrailers(this.id,this.categoria,"ES").toPromise();
    this.trailers=res.results;
    }
    else
    this.trailers=res.results;
      
  }
  url(key)
  {
    return `https://www.youtube.com/embed/${key}`;
  }

}
