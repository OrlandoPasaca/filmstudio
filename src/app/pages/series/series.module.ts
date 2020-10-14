import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesComponent } from './series.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PresentacionModule } from 'src/app/modules/presentacion/presentacion.module';


@NgModule({
  declarations: [SeriesComponent],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    ReactiveFormsModule,
    PresentacionModule
  ]
})
export class SeriesModule { }
