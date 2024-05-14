import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';

const routes: Routes = [

  {
    path: '',
    component: ExpenseListComponent,
    //children: [{ path: 'list', component: FertilizerListComponent }]
  },
  {
    path: 'page/:page',
    component: ExpenseListComponent
  },

  {
    path: 'crop/:cropId',
    component: ExpenseListComponent
  },

  {
    path: 'crop/:cropId/page/:page',
    component: ExpenseListComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
