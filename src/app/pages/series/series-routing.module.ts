import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesComponent } from './series.component';


const routes: Routes = [
  {
    path:"",
    component:SeriesComponent,
    children:[
      {
        path:"temporada/:temporada",
        loadChildren:()=>import("../../modules/temporada/temporada.module").then(m=>m.TemporadaModule)
      },
      {
        path:"temporada",
        redirectTo:'temporada/1'
      },
      {
        path:"",
        redirectTo:'temporada/1'
      },
      {
        path:"trailers",
        loadChildren:()=>import("../../modules/trailers/trailers.module").then(m=>m.TrailersModule)
      },
      {
        path:"details",
        loadChildren:()=>import("../../modules/details/details.module").then(m=>m.DetailsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule { }
