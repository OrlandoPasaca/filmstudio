import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailersComponent } from './trailers.component';
import { TrailersRoutingModule } from './trailers-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [TrailersComponent],
  imports: [
    CommonModule,
    TrailersRoutingModule,
    PipesModule
  ]
})
export class TrailersModule { }
