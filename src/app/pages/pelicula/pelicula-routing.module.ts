import {Routes,RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import { PeliculaComponent } from './pelicula.component'

const routes:Routes=[
    {
        path:"",
        component:PeliculaComponent,
        children:[
            {
                path:"trailers",
                loadChildren:()=>import("../../modules/trailers/trailers.module").then(m=>m.TrailersModule)
            },
            {
                path:"",
                redirectTo:"trailers"
            },
            {
                path:"details",
                loadChildren:()=>import("../../modules/details/details.module").then(m=>m.DetailsModule)
            },
        ]
    }
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PeliculaRoutingModule
{

}