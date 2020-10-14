import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcmaComponent } from './dcma.component';
import { DCMARoutingModule } from './dcma-routing.module';



@NgModule({
  declarations: [DcmaComponent],
  imports: [
    CommonModule,
    DCMARoutingModule
  ]
})
export class DcmaModule { }
