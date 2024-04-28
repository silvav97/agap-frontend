import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './components/generic-card/generic-card.component';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { FormsModule } from '@angular/forms';
import { GenericFormComponent } from './components/generic-form/generic-form.component';



@NgModule({
  declarations: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent,
    GenericListComponent,
    GenericFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent,
    GenericListComponent
  ]
})
export class SharedModule { }
