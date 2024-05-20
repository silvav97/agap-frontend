import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CropRoutingModule } from './crop-routing.module';
import { CropFormComponent } from './pages/crop-form/crop-form.component';
import { CropListComponent } from './pages/crop-list/crop-list.component';
import { SharedModule } from '../shared/shared.module';
import { MyCropListComponent } from './pages/my-crop-list/my-crop-list.component';
import { CloseCropFormComponent } from './pages/close-crop-form/close-crop-form.component';


@NgModule({
  declarations: [
    CropFormComponent,
    CropListComponent,
    MyCropListComponent,
    CloseCropFormComponent
  ],
  imports: [
    CommonModule,
    CropRoutingModule,
    SharedModule
  ]
})
export class CropModule { }
