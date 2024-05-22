import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { roleGuard } from '../auth/guards/role.guard';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { EnsayandoComponent } from './pages/ensayando/ensayando.component';
import { ProjectFormIndependienteComponent } from './pages/project-form-independiente/project-form-independiente.component';

const routes: Routes = [

  {
    path: '',
    component: ProjectListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: ProjectListComponent
  },
  {
    path: 'new',
    // canActivate: [ roleGuard ],
    // data: { roles: ['ADMIN'] },
    component: ProjectFormIndependienteComponent    // EnsayandoComponent
  },
  {
    path: 'edit/:id',
    component: ProjectFormIndependienteComponent
  },

  {
    path: 'info/:id',
    component: ProjectInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
