import { Component, OnInit, Input, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css']
})
export class SliderHomeComponent implements OnInit {

  
  @Input('tipo') tipo_slider:string;
  @Input('titulo') titulo_slider:string;
  n_peliculas;
  posicion=0;
  translate=`translateX(${this.posicion}%)`;
  transition:boolean=false;
  n_translate=0;
  width;
  clase;
  tamano;
  @HostListener('window:resize',['$event'])
  onResize(event)
  {
    this.cambiartamamo(event); 
  }
  constructor(){}

  ngOnInit(): void {
    if(window.innerWidth>1000)
    {
      this.n_peliculas=new Array(15).fill(0);
      this.clase='col-2'
      this.tamano=5;
      
    }
    else if(window.innerWidth>600)
    {
      this.n_peliculas=new Array(9).fill(0);
      this.clase='col-4'
      this.tamano=3;
    }
    else
    {
      this.n_peliculas=new Array(6).fill(0);
      this.clase='col-6'
      this.tamano=2;
    }

    this.n_peliculas=this.n_peliculas.map((value,index,n_peliculas)=>n_peliculas[index]=index);
    
  }

  //Cambia tamaño de los posters del slider (responsive)
  cambiartamamo(event)
  {
    this.width=event.target.innerWidth;
    if(this.width>1000)
    while(this.n_peliculas.length!=15)
    {
      this.quitar_agregar_elementos(15);
      this.clase='col-2'
      this.tamano=5
    }
    
    else if(this.width>600)
    while(this.n_peliculas.length!=9)
    {
      this.quitar_agregar_elementos(9);
      this.clase='col-4'
      this.tamano=3
    }
    else
    while(this.n_peliculas.length!=6)
    {
      this.quitar_agregar_elementos(6);
      this.clase='col-6'
      this.tamano=2
    }
  }

  //Evalua que elemento debe agregarse al array n_peliculas al hacer unshift
  evaluar_posicion_unshift(valor:number)
  {
    if(valor-1<0)
    return 34;
    else
    return valor-1;
  }
  //Evalua que elemento debe agregarse al array n_peliculas al hacer push
  evaluar_posicion_push(valor:number)
  {
    if(valor+1>34)
    return 0;
    else
    return valor+1;
  }
  //Quita o agrega elementos del array n_peliculas
  quitar_agregar_elementos(valor)
  {
    if(this.n_peliculas.length>valor)
      {
        if(this.n_translate>0)
        this.n_peliculas.shift();
        this.n_peliculas.pop();
      }
    else
      {
        if(this.n_translate>0)
        this.n_peliculas.unshift(this.evaluar_posicion_unshift(this.n_peliculas[0]));
        this.n_peliculas.push(this.evaluar_posicion_push(this.n_peliculas[this.n_peliculas.length-1]));
        
        
      }
  }
}
