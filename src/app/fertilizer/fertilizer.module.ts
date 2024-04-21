import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FertilizerRoutingModule } from './fertilizer-routing.module';
import { FertilizerLayoutComponent } from './layouts/fertilizer-layout/fertilizer-layout.component';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [

    FertilizerLayoutComponent,
       FertilizerListComponent
  ],
  imports: [
    CommonModule,
    FertilizerRoutingModule,
    SharedModule
  ]
})
export class FertilizerModule { }
