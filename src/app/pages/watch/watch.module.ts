import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchComponent } from './watch.component';
import { WatchRoutingModule } from './watch-routing.module';
import { Error404Module } from 'src/app/modules/error404/error404.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [WatchComponent],
  imports: [
    CommonModule,
    WatchRoutingModule,
    Error404Module,
    RouterModule,
    PipesModule,
    FormsModule
  ]
})
export class WatchModule { }
