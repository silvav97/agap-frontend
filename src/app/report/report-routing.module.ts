import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectReportListComponent } from './pages/project-report-list/project-report-list.component';
import { ProjectReportInfoComponent } from './pages/project-report-info/project-report-info.component';
import { CropReportInfoComponent } from './pages/crop-report-info/crop-report-info.component';

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
    path: 'project/info/:id/page/:page',
    component: ProjectReportInfoComponent
  },



  {
    path: 'crop/info/:id',
    component: CropReportInfoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
