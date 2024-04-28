import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PesticideRoutingModule } from './pesticide-routing.module';
import { PesticideFormComponent } from './pages/pesticide-form/pesticide-form.component';
import { PesticideListComponent } from './pages/pesticide-list/pesticide-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PesticideFormComponent,
    PesticideListComponent,
  ],
  imports: [
    CommonModule,
    PesticideRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PesticideModule { }
