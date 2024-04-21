import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FertilizerLayoutComponent } from './layouts/fertilizer-layout/fertilizer-layout.component';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';

const routes: Routes = [

  {
    path: '',
    component: FertilizerLayoutComponent,
    children: [
      { path: 'list', component: FertilizerListComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule { }
