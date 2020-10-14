import { NgModule } from '@angular/core';
import {SinopsisgeneralPipe} from './sinopsisgeneral.pipe';
import { SanitizerPipe } from './sanitizer.pipe';



@NgModule({
  declarations: [SinopsisgeneralPipe, SanitizerPipe],
  imports: [
    
  ],
  exports:[SinopsisgeneralPipe,SanitizerPipe]
})
export class PipesModule { }
