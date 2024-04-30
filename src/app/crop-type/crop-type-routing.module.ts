import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropTypeListComponent } from './pages/crop-type-list/crop-type-list.component';
import { CropTypeFormComponent } from './pages/crop-type-form/crop-type-form.component';

const routes: Routes = [

  {
    path: '',
    component: CropTypeListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: CropTypeListComponent
  },
  {
    path: 'new',
    component: CropTypeFormComponent,
  },
  {
    path: 'edit/:id',
    component: CropTypeFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropTypeRoutingModule { }
