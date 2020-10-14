import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { DcmaComponent } from './dcma.component';
const routes:Routes=[
    {
        path:"",component:DcmaComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class DCMARoutingModule
{
    
}