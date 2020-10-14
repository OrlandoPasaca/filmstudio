import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/servicios/navbar.service';
import { ServicemainService } from 'src/app/servicios/servicemain.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  nav:ElementRef
  cantbolas=Array(6);
  id:number;
  tipo_slider:string[]=["estrenos","recien_agregadas_movies"];
  titulo_slider:string[]=["Estrenos","Recien Agregadas"]
  posicion:number;
  urlimg:string;
  stylebola:object[];
  timeout:number;
  titulo:string; 
  status:string;
  descripcion:string;
  categoria:string;
  generos:any;
  temporada:number;
  capitulo:number;
  n_slider:number[]=[];
  n_fake_poster:number[];
  clase_fake_poster:string;
  
  navHeight:number;
  contPresHeight:number;
  mainHeight:number;
  nav_contPres_main:number;
  cont_slider_push:number=0;
  windowHeight:number;
  opacidad:boolean;
  @HostListener('window:scroll',['$event'])
  onScroll(event)
  {
    //tamaño del navbar
    this.navHeight=this.serviceNav.height;
    //tamaño contenedor presentacion
    this.contPresHeight=document.getElementById("contenedorpresentacion").offsetHeight;
    //tamaño del main
    this.mainHeight=document.getElementsByTagName("main")[0].offsetHeight;
    //suma del nav + contenedor presentacion + main
    this.nav_contPres_main=this.navHeight+this.contPresHeight+this.mainHeight;
    //tamano de la pantalla
    this.windowHeight = window.innerHeight;
    //tamaño 1 slider entre dos
    let extra:number;
    //si hay slider activos le damos valor a extra
    if(this.n_slider.length>0)
    { extra=(this.mainHeight/this.n_slider.length)/2;}
    //si no le asignamos valor 0
    else
    { extra=0}
    //si el scroll baja una cantidad de pixeles
    if(document.documentElement.scrollTop>=this.nav_contPres_main-this.windowHeight+extra && this.cont_slider_push==0)
    {
      
      if(this.n_slider.length<this.tipo_slider.length)
      {
      this.cont_slider_push=1;
      this.n_slider.push(1);
      }
    }
  }
  constructor(private service:ServicemainService,
              private serviceNav:NavbarService,
              private ref:ChangeDetectorRef) 
  { 
    
    this.opacidad=true;
    this.urlimg='';
    this.posicion=-1;
    this.stylebola=[
      {'background-color':'rgb(45, 152, 32)'},
      {'background-color':'white'},
      {'background-color':'white'},
      {'background-color':'white'},
      {'background-color':'white'},
      {'background-color':'white'}
    ];
    this.cambiarimg();
    this.timeout=window.setInterval(()=>{this.cambiarimg()},8000)
  }
  ngOnInit(): void 
  {    
    if(window.innerWidth>1000)
    {
    this.clase_fake_poster='col-2'
    this.n_fake_poster=new Array(5);
    }
    else if(window.innerWidth>600)
    {
    this.clase_fake_poster='col-4'
    this.n_fake_poster=new Array(3);
    }
    else
    {
    this.n_fake_poster=new Array(2);
    this.clase_fake_poster='col-6'
    }
  }
  ngAfterViewInit():void
  {
    
  }
  ngDoCheck(): void
  {
    
    this.cont_slider_push=0;

    this.navHeight=this.serviceNav.height;
    this.contPresHeight=document.getElementById("contenedorpresentacion").offsetHeight;
    this.mainHeight=document.getElementsByTagName("main")[0].offsetHeight;
    this.nav_contPres_main=this.navHeight+this.contPresHeight+this.mainHeight;
    this.windowHeight = window.innerHeight;
    this.iniciar_slider();
    
  }
  iniciar_slider()
  {
    if(this.windowHeight>this.nav_contPres_main) 
    {
      this.n_slider.push(1);
    }
    else return;
  }
reiniciarcolor_bolas()
{
  for(let x=0;x<this.stylebola.length;x++)
      {
        this.stylebola[x]["background-color"]='white';
      }
}
condicion_posicion()
{
  if(this.posicion<5)
    {
      this.posicion++;
    }
  else
    {
      this.posicion=0;
    }
}
async cambiarimg()
{
  this.opacidad=false;
  this.condicion_posicion();
  this.reiniciarcolor_bolas();
  this.stylebola[this.posicion]["background-color"]='rgb(45, 152, 32)';
  const id_categoria=await this.service.obtener_id_movie(this.posicion).toPromise();
  this.id=id_categoria.id
  this.temporada=id_categoria.temporada;
  this.capitulo=id_categoria.capitulo;
  const pel_tmdb=await this.service.cargar_img_presentacion2(id_categoria)
  .subscribe((res:any)=>
  {
      this.opacidad=true;
      this.titulo=res.name;
      this.urlimg=`https://image.tmdb.org/t/p/original/${res.backdrop_path}`;
      this.descripcion=res.overview;
      this.categoria=res.categoria;
      this.generos=res.genres;
      this.generos=this.generos.map((genero:any)=>genero.name);
      this.generos=this.generos.join(",");
      this.status=res.status;
        
  });
  
}
clickbola(i:number)
{
    clearInterval(this.timeout);
    this.posicion=i-1;
    this.cambiarimg();
    this.timeout=window.setInterval(()=>{this.cambiarimg()},8000)
}
clickflecha_derecha()
{
  clearInterval(this.timeout);
  this.cambiarimg();
  this.timeout=window.setInterval(()=>{this.cambiarimg()},8000)
}
clickflecha_izquierda()
{ 
  clearInterval(this.timeout);
  if(this.posicion==1)
  {
    this.posicion=this.stylebola.length+2;
  }
  else if(this.posicion==0)
  {
    this.posicion=this.stylebola.length;
  }              
  this.posicion=this.posicion-2;  
  this.cambiarimg();
  this.timeout=window.setInterval(()=>{this.cambiarimg()},8000)
}
ngOnDestroy():void
{
  clearInterval(this.timeout);
}

}
