import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculaComponent } from './pelicula.component';
import { RouterModule } from '@angular/router';
import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { PresentacionModule } from 'src/app/modules/presentacion/presentacion.module';



@NgModule({
  declarations: [PeliculaComponent],
  imports: [
    CommonModule,
    RouterModule,
    PeliculaRoutingModule,
    PipesModule,
    PresentacionModule
  ]
})
export class PeliculaModule { }
