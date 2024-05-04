import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';
import { FertilizerFormComponent } from './pages/fertilizer-form/fertilizer-form.component';

const routes: Routes = [

  {
    path: '',
    component: FertilizerListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: FertilizerListComponent
  },
  {
    path: 'new',
    component: FertilizerFormComponent
  },
  {
    path: 'edit/:id',
    component: FertilizerFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule { }
