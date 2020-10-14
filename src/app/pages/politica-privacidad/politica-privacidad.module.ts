import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticaPrivacidadComponent } from './politica-privacidad.component';
import { PoliticaPrivacidadRoutingModule } from './politica-privacidad-routing.module';



@NgModule({
  declarations: [PoliticaPrivacidadComponent],
  imports: [
    CommonModule,
    PoliticaPrivacidadRoutingModule
  ]
})
export class PoliticaPrivacidadModule { }
