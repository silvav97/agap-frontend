import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    ProjectListComponent
  ],
})
export class ProjectModule { }
