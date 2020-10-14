import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {TemporadaComponent} from './temporada.component'

const routes:Routes=[
    {
        path:"",
        component:TemporadaComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class TemporadaRoutingModule
{
    
}