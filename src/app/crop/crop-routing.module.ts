import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropFormComponent } from './pages/crop-form/crop-form.component';
import { CropListComponent } from './pages/crop-list/crop-list.component';
import { MyCropListComponent } from './pages/my-crop-list/my-crop-list.component';


const routes: Routes = [

  {
    path: '',
    component: CropListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: CropListComponent
  },

  {
    path: 'mine',
    component: MyCropListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'mine/page/:page',
    component: MyCropListComponent
  },


  {
    path: 'new/:projectApplicationId',
    component: CropFormComponent,
  },
  {
    path: 'edit/:id/:projectApplicationId',
    component: CropFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropRoutingModule { }
