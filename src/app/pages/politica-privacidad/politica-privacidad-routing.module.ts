import {Routes,RouterModule} from '@angular/router'
import {NgModule} from '@angular/core'
import {PoliticaPrivacidadComponent} from './politica-privacidad.component'

const routes:Routes=[
    {
        path:"",component:PoliticaPrivacidadComponent
    }
];
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class PoliticaPrivacidadRoutingModule
{
    
}