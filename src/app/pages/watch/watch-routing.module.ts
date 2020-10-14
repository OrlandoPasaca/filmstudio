import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { WatchComponent } from './watch.component';

const routes:Routes=[
    {
        path:'',component:WatchComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forChild(routes)],
        exports:[RouterModule]
    }
)
export class WatchRoutingModule{}