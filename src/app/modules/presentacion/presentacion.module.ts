import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentacionComponent } from './presentacion.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import {RouterModule} from '@angular/router'


@NgModule({
  declarations: [PresentacionComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule
  ],
  exports:[PresentacionComponent]
})
export class PresentacionModule { }
