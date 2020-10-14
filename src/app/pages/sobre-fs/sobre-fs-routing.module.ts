import {Routes,RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { SobreFsComponent } from './sobre-fs.component';

const routes:Routes=[
    {
        path:"",component:SobreFsComponent
    }
];
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class SobreFsRoutingModule
{

}