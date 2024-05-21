import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './components/generic-card/generic-card.component';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GenericListComponent } from './components/generic-list/generic-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { GenericInfoComponent } from './components/generic-info/generic-info.component';



@NgModule({
  declarations: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent,
    GenericListComponent,
    GenericFormComponent,
    GenericInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent,
    GenericListComponent,
    GenericFormComponent,
    GenericInfoComponent
  ]
})
export class SharedModule { }
