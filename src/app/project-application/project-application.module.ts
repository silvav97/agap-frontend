import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectApplicationRoutingModule } from './project-application-routing.module';
import { ProjectApplicationFormComponent } from './pages/project-application-form/project-application-form.component';
import { ProjectApplicationListComponent } from './pages/project-application-list/project-application-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProjectApplicationFormComponent,
    ProjectApplicationListComponent
  ],
  imports: [
    CommonModule,
    ProjectApplicationRoutingModule,
    SharedModule
  ]
})
export class ProjectApplicationModule { }
