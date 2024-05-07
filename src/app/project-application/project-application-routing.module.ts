import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectApplicationListComponent } from './pages/project-application-list/project-application-list.component';
import { ProjectApplicationFormComponent } from './pages/project-application-form/project-application-form.component';
import { roleGuard } from '../auth/guards/role.guard';
import { MyProjectApplicationListComponent } from './pages/my-project-application-list/my-project-application-list.component';

const routes: Routes = [

  {
    path: '',
    component: ProjectApplicationListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: ProjectApplicationListComponent
  },
  {
    path: 'project/:projectId',
    component: ProjectApplicationListComponent
  },
  {
    path: 'mine',
    component: MyProjectApplicationListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'mine/page/:page',
    component: MyProjectApplicationListComponent
  },
  {
    path: 'new/:projectId',
    //canActivate: [ roleGuard ],
    //data: { roles: ['ADMIN'] },
    component: ProjectApplicationFormComponent
  },
  {
    path: 'edit/:id/:projectId',
    component: ProjectApplicationFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectApplicationRoutingModule { }
