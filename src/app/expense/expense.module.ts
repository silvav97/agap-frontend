import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExpenseListComponent,
    ExpenseFormComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SharedModule
  ]
})
export class ExpenseModule { }
