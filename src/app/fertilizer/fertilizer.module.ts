import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FertilizerRoutingModule } from './fertilizer-routing.module';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FertilizerFormComponent } from './pages/fertilizer-form/fertilizer-form.component';


@NgModule({
  declarations: [
       FertilizerListComponent,
       FertilizerFormComponent
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
