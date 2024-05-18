import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { FormsModule } from '@angular/forms';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectInfoComponent
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
