import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculasRoutingModule } from './peliculas-routing.module';
import { PeliculasComponent } from './peliculas.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SliderHomeModule } from 'src/app/modules/slider-home/slider-home.module';


@NgModule({
  declarations: [PeliculasComponent],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    PipesModule,
    SliderHomeModule
  ]
})
export class PeliculasModule { }
