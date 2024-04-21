import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FertilizerRoutingModule } from './fertilizer-routing.module';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
       FertilizerListComponent
  ],
  imports: [
    CommonModule,
    FertilizerRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class FertilizerModule { }
