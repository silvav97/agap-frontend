import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FertilizerListComponent } from './pages/fertilizer-list/fertilizer-list.component';

const routes: Routes = [

  {
    path: '',
    component: FertilizerListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',  // Añade esta línea para manejar la paginación
    component: FertilizerListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FertilizerRoutingModule { }
