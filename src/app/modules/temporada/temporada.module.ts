import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemporadaComponent } from './temporada.component';
import { TemporadaRoutingModule } from './temporada-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TemporadaComponent],
  imports: [
    CommonModule,
    TemporadaRoutingModule,
    ReactiveFormsModule
  ]
})
export class TemporadaModule { }
