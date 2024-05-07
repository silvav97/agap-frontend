import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectApplicationRoutingModule } from './project-application-routing.module';
import { ProjectApplicationFormComponent } from './pages/project-application-form/project-application-form.component';
import { ProjectApplicationListComponent } from './pages/project-application-list/project-application-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MyProjectApplicationListComponent } from './pages/my-project-application-list/my-project-application-list.component';


@NgModule({
  declarations: [
    ProjectApplicationFormComponent,
    ProjectApplicationListComponent,
    MyProjectApplicationListComponent
  ],
  imports: [
    CommonModule,
    ProjectApplicationRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProjectApplicationModule { }
