import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderHomeComponent } from './slider-home.component';
import { CardPeliculaModule } from '../card-pelicula/card-pelicula.module';
import { SliderLeftDirective } from './directives/slider-left.directive';
import { SliderRigthDirective } from './directives/slider-rigth.directive';



@NgModule({
  declarations: [SliderHomeComponent, SliderLeftDirective, SliderRigthDirective],
  imports: [
    CommonModule,
    CardPeliculaModule
  ],
  exports:[
    SliderHomeComponent
  ]
})
export class SliderHomeModule { }
