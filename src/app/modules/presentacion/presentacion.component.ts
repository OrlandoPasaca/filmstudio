import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuscarpeliculaService } from './services/buscarpelicula.service';
import { BuscarSerieService } from './services/buscarserie.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  @ViewChild('play')
  play:ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas')
  canvas:ElementRef<HTMLCanvasElement>;
  ctx;
  rotate;
  @ViewChild('canvas2') 
  canvas2:ElementRef<HTMLCanvasElement>;
  ctx2;
  id;
  temporada;
  backdrop_path;
  name;
  descripcion;
  valoracion_grados;
  valorPorcenInicial;
  valorPorcenFinal;
  n_temporadas;
  generos;
  director;
  categoria;
  constructor(private route:ActivatedRoute,private service:BuscarpeliculaService,private serviceSerie:BuscarSerieService) 
  { 
    this.rotate=0;
    this.valorPorcenInicial=0;
    this.route.parent.url.subscribe(res=>
      {
        this.categoria=res[0].path;
      })
    this.route.paramMap.subscribe(res=>
      {
        this.rotate=0;
        this.valorPorcenInicial=0;
        this.id=res.get("id");
        if(this.categoria=="pelicula")
        this.buscar();
        else if(this.categoria=="serie")
        {
          this.route.firstChild.paramMap.subscribe(params=>this.temporada=params.get("temporada"));
          this.buscarSerie();
        }
      });
      
  }

  ngOnInit(): void {
  }
  buscar()
  {
    this.service.buscarPelicula(this.id)
    .subscribe((res:any)=>
      {
        this.name=res.title;
        this.descripcion=res.overview;
        this.generos=res.genres.map(res=>res.name);
        this.generos=this.generos.join(",");
        this.valoracion_grados=((res.vote_average*10)*360)/100;
        this.valorPorcenFinal=res.vote_average*10;
        this.crearCanvas(this.valoracion_grados);
        this.textoCanvas();
        this.playCanvas();
        this.backdrop_path=`url(https://image.tmdb.org/t/p/original/${res.backdrop_path})`
      })
      this.service.getCredits(this.id)
      .subscribe((res:any)=>
      {
        this.director=res.crew.filter(res=>res.job=="Director")
      })
  }
  buscarSerie()
  {
    this.serviceSerie.buscarSerie(this.id).
    subscribe((res:any)=>
    {
      this.name=res.name;
      this.descripcion=res.overview;
      this.generos=res.genres.map(res=>res.name);
      this.generos=this.generos.join(",");
      this.director=res.created_by.map(res=>res.name);
      this.valoracion_grados=((res.vote_average*10)*360)/100;
      this.valorPorcenFinal=res.vote_average*10;
      this.crearCanvas(this.valoracion_grados);
      this.textoCanvas();
      this.playCanvas();
      this.backdrop_path=`url(https://image.tmdb.org/t/p/original/${res.backdrop_path})`;      
    });
  }
  crearCanvas(valoracion)
  {
    if(this.ctx)
    {
      this.ctx.clearRect(0, 0, 100,100)
      this.ctx.translate(50,50);
      this.ctx.rotate((Math.PI/180)*90)
      this.ctx.translate(-50,-50);
    }
    this.ctx=this.canvas.nativeElement.getContext('2d');
    this.ctx.beginPath();
    this.ctx.lineWidth=6
    this.ctx.strokeStyle="rgba(191, 248, 190, 0.25)"
    this.ctx.fill()
    this.ctx.stroke();
    this.ctx.translate(50,50);
    this.ctx.rotate((Math.PI/180)*-90)
    this.ctx.translate(-50,-50);
    this.textoCanvas();
    let animar=()=>
    {
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, 100,100)
      this.ctx.arc(50,50,40,0,(Math.PI/180)*this.rotate);
      this.ctx.strokeStyle="#31971B"
      this.ctx.lineWidth=6
      this.ctx.lineCap="round"
      this.ctx.stroke();
      this.rotate=this.rotate+5;
      if(this.rotate<valoracion)
      {
      requestAnimationFrame(animar);
      }
      
    }
    animar();
  }

  textoCanvas()
  {
    this.ctx2=this.canvas2.nativeElement.getContext('2d');
    let animar2=()=>
    {
    this.ctx2.beginPath();
    this.ctx2.clearRect(0, 0, 100,100)
    this.ctx2.font="20px 'Tahoma'";
    this.ctx2.fillStyle="white";
    this.ctx2.fillText(this.valorPorcenInicial+"%",43,57); 
    this.valorPorcenInicial++;
    if(this.valorPorcenInicial<this.valorPorcenFinal)
    requestAnimationFrame(animar2);
    }
    animar2();
  }

  
  playCanvas()
  {
    const ctx3= this.play.nativeElement.getContext('2d');
    ctx3.beginPath();
    ctx3.moveTo(0,1);
    ctx3.lineTo(0,8);
    ctx3.lineTo(11,4);
    ctx3.closePath();
    ctx3.fillStyle="#31971B";
    ctx3.fill();    
  }

}
