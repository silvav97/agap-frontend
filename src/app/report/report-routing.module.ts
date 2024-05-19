import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectReportListComponent } from './pages/project-report-list/project-report-list.component';
import { CropReportListComponent } from './pages/crop-report-list/crop-report-list.component';
import { ProjectReportInfoComponent } from './pages/project-report-info/project-report-info.component';

const routes: Routes = [

  {
    path: 'project',
    component: ProjectReportListComponent,
  },

  {
    path: 'project/page/:page',
    component: ProjectReportListComponent
  },

  {
    path: 'project/info/:id',
    component: ProjectReportInfoComponent
  },



  {
    path: 'crop/:projectId',
    component: CropReportListComponent,
  },

  {
    path: 'crop/:projectId/page/:page',
    component: CropReportListComponent
  },

  {
     path: 'project/info/:id/page/:page',
     component: ProjectReportInfoComponent       //CropReportListComponent
   },

  {
    path: 'crop/info/:id',
    component: CropReportListComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
