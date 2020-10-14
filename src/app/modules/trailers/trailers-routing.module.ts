import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {TrailersComponent} from './trailers.component'

const routes:Routes=[
    {
        path:"",
        component:TrailersComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class TrailersRoutingModule
{
    
}