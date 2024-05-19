import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ProjectReportListComponent } from './pages/project-report-list/project-report-list.component';
import { SharedModule } from '../shared/shared.module';
import { CropReportListComponent } from './pages/crop-report-list/crop-report-list.component';
import { CropReportInfoComponent } from './pages/crop-report-info/crop-report-info.component';
import { ProjectReportInfoComponent } from './pages/project-report-info/project-report-info.component';


@NgModule({
  declarations: [
    ProjectReportListComponent,
    CropReportListComponent,
    CropReportInfoComponent,
    ProjectReportInfoComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
