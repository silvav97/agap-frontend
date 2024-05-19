import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActionConfig } from '../generic-table/generic-table.component';
import { Pagination } from '../../interfaces/pagination.interface';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'shared-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent {

  @Input() public baseRoute?: string;
  @Input() public listTitle?: string;
  @Input() public items: any[] = [];
  @Input() public columns?: { key: string, label: string }[];
  @Input() public actionsConfig?: ActionConfig[];
  @Input() public paginator!: Pagination<any>;
  @Input() public pageSize?: number;
  @Input() public pageSizes?: number[];

  @Output() public pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.pageSizeChange.emit(newSize);
  }

}
