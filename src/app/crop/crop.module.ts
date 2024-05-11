import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CropRoutingModule } from './crop-routing.module';
import { CropFormComponent } from './pages/crop-form/crop-form.component';
import { CropListComponent } from './pages/crop-list/crop-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CropFormComponent,
    CropListComponent
  ],
  imports: [
    CommonModule,
    CropRoutingModule,
    SharedModule
  ]
})
export class CropModule { }
