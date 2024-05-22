import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { EnsayandoComponent } from './pages/ensayando/ensayando.component';
import { ProjectFormIndependienteComponent } from './pages/project-form-independiente/project-form-independiente.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent,
    ProjectInfoComponent,
    EnsayandoComponent,
    ProjectFormIndependienteComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ProjectListComponent
  ],
})
export class ProjectModule { }
