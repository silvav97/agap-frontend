import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FertilizerRoutingModule } from './fertilizer-routing.module';
import { FertilizerFormComponent } from './pages/fertilizer-form/fertilizer-form.component';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    FertilizerFormComponent,
    FertilizerListComponent,

  ],
  imports: [
    CommonModule,
    FertilizerRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FertilizerModule { }
