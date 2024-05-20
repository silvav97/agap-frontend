import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';

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

  {
    path: 'new/:cropId',
    //canActivate: [ roleGuard ],
    //data: { roles: ['ADMIN'] },
    component: ExpenseFormComponent
  },
  {
    path: 'edit/:id/:cropId',
    component: ExpenseFormComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
