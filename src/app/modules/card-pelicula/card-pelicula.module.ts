import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPeliculaComponent } from './card-pelicula.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CardPeliculaComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[CardPeliculaComponent]
})
export class CardPeliculaModule { }
