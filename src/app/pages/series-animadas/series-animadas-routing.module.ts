import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesAnimadasComponent } from './series-animadas.component';


const routes: Routes = [
  {
    path:"",component:SeriesAnimadasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesAnimadasRoutingModule { }
