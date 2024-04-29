import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesticideListComponent } from './pages/pesticide-list/pesticide-list.component';
import { PesticideFormComponent } from './pages/pesticide-form/pesticide-form.component';
import { GenericFormComponent } from '../shared/components/generic-form/generic-form.component';

const routes: Routes = [

  {
    path: '',
    component: PesticideListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: PesticideListComponent
  },
  {
    path: 'new',
    component: PesticideFormComponent,
  },
  {
    path: 'edit/:id',
    component: PesticideFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesticideRoutingModule { }
