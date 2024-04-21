import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './components/generic-card/generic-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GenericCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GenericCardComponent
  ]
})
export class SharedModule { }
