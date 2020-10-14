import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SliderHomeModule } from 'src/app/modules/slider-home/slider-home.module';
import { ScrollDirectiveDirective } from './directives/scroll-directive.directive';


@NgModule({
  declarations: [
    HomeComponent,
    ScrollDirectiveDirective,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PipesModule,
    SliderHomeModule
  ]
})
export class HomeModule { }
