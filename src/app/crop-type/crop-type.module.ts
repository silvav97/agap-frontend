import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CropTypeRoutingModule } from './crop-type-routing.module';
import { CropTypeFormComponent } from './pages/crop-type-form/crop-type-form.component';
import { CropTypeListComponent } from './pages/crop-type-list/crop-type-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CropTypeFormComponent,
    CropTypeListComponent
  ],
  imports: [
    CommonModule,
    CropTypeRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CropTypeModule { }
