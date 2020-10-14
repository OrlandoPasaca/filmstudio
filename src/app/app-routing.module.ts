import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"home",
    loadChildren:()=>import("./pages/home/home.module").then(m=>m.HomeModule)
  },
  {
    path:"peliculas",
    loadChildren:()=>import("./pages/peliculas/peliculas.module").then(m=>m.PeliculasModule)
  },
  {
    path:"pelicula/:id",
    loadChildren:()=>import("./pages/pelicula/pelicula.module").then(m=>m.PeliculaModule)
  },
  {
    path:"serie/:id",
    loadChildren:()=>import("./pages/series/series.module").then(m=>m.SeriesModule)
  },
  {
    path:"series_animadas",
    loadChildren:()=>import("./pages/series-animadas/series-animadas.module").then(m=>m.SeriesAnimadasModule)
  },
  {
    path:"animes",
    loadChildren:()=>import("./pages/animes/animes.module").then(m=>m.AnimesModule)
  },
  {
    path:"sobre-fs",
    loadChildren:()=>import("./pages/sobre-fs/sobre-fs.module").then(m=>m.SobreFsModule)
  },
  {
    path:"contacto",
    loadChildren:()=>import("./pages/contacto/contacto.module").then(m=>m.ContactoModule)
  },
  {
    path:"dcma",
    loadChildren:()=>import("./pages/dcma/dcma.module").then(m=>m.DcmaModule)
  },
  {
    path:"terminos-y-condiciones",
    loadChildren:()=>import("./pages/terminos-condiciones/terminos-condiciones.module").then(m=>m.TerminosCondicionesModule)
  },
  {
    path:"politica-de-privacidad",
    loadChildren:()=>import("./pages/politica-privacidad/politica-privacidad.module").then(m=>m.PoliticaPrivacidadModule)
  },
  {
    path:'watch/:id',
    loadChildren:()=>import('./pages/watch/watch.module').then(m=>m.WatchModule)
  },
  {
    path:'series',
    loadChildren:()=>import('./pages/serie/serie.module').then(m=>m.SerieModule)
  },
  {
    path:"", pathMatch:"full", redirectTo:"home"
  },
  {
    path:"**", pathMatch:"full", redirectTo:"home"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
