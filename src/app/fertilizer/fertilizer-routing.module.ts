import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FertilizerLayoutComponent } from './layouts/fertilizer-layout/fertilizer-layout.component';

const routes: Routes = [

  {
    path: '',
    component: FertilizerLayoutComponent,
    // children: []
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule { }
