import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericCardComponent } from './components/generic-card/generic-card.component';
import { RouterModule } from '@angular/router';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';



@NgModule({
  declarations: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GenericCardComponent,
    GenericTableComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
