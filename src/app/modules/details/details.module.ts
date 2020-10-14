import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details-routing.mudule';
import { ImageActorPipe } from './pipes/image-actor.pipe';



@NgModule({
  declarations: [DetailsComponent, ImageActorPipe],
  imports: [
    CommonModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
