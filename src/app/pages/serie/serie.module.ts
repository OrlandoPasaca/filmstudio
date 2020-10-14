import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SerieComponent } from './serie.component';
import { SliderHomeModule } from 'src/app/modules/slider-home/slider-home.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { SerieRoutingModule } from './serie-routing.module';



@NgModule({
  declarations: [SerieComponent],
  imports: [
    CommonModule,
    PipesModule,
    SliderHomeModule,
    RouterModule,
    SerieRoutingModule
  ]
})
export class SerieModule { }
