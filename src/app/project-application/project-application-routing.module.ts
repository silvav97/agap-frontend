import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectApplicationListComponent } from './pages/project-application-list/project-application-list.component';
import { ProjectApplicationFormComponent } from './pages/project-application-form/project-application-form.component';
import { roleGuard } from '../auth/guards/role.guard';

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
    path: 'new',
    canActivate: [ roleGuard ],
    data: { roles: ['ADMIN'] },
    component: ProjectApplicationFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectApplicationRoutingModule { }
