import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FertilizerRoutingModule } from './fertilizer-routing.module';
import { FertilizerLayoutComponent } from './layouts/fertilizer-layout/fertilizer-layout.component';


@NgModule({
  declarations: [
  
    FertilizerLayoutComponent
  ],
  imports: [
    CommonModule,
    FertilizerRoutingModule
  ]
})
export class FertilizerModule { }
