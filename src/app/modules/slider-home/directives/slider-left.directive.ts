import { Directive, Input, HostListener, Output,EventEmitter,OnInit } from '@angular/core';


@Directive({
  selector: '[SliderLeft]'
})
export class SliderLeftDirective {

  @HostListener('click') onClick()
  {
    this.clickFlecha();
  }
  @Output() output_n_pel=new EventEmitter(); 
  @Output() output_translate =new EventEmitter();
  @Output() ouput_transition=new EventEmitter();
  @Output() ouput_posicion=new EventEmitter(); 
  @Output() ouput_n_trans=new EventEmitter();
  @Input() n_peliculas;
  @Input() translate;
  @Input() transition;
  @Input() posicion;
  @Input() n_translate;
  @Input() tamano;
  

  constructor(){}
 
  clickFlecha()
  {
    if(!this.transition) this.translateSlider();
    else return;
  }
  translateSlider()
  {
    this.transition=true;
    this.ouput_transition.emit(this.transition);
    this.posicion=this.posicion-100;
    this.ouput_posicion.emit(this.posicion);
    this.translate=`translateX(${this.posicion}%)`;
    this.output_translate.emit(this.translate);
    this.n_translate++;
    this.ouput_n_trans.emit(this.n_translate);

    setTimeout(()=>
    {
      this.transition=false;
      this.ouput_transition.emit(this.transition);
      this.posicion=-100;
      this.ouput_posicion.emit(this.posicion);
      this.translate=`translateX(${this.posicion}%)`;
      this.output_translate.emit(this.translate);
      if(this.n_translate>1)
      this.n_peliculas=this.n_peliculas.map((value,index,n_peliculas)=>n_peliculas[index]=this.evaluar_posicion(n_peliculas[index]));
      this.output_n_pel.emit(this.n_peliculas);
    },800);
    
  }

  evaluar_posicion(valor:number)
  {
    if(valor+this.tamano>34)
    return this.tamano-(34-(valor-1));
    else
    return valor+this.tamano;
  }

}
