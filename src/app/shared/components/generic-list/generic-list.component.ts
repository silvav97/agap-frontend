import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionConfig } from '../generic-table/generic-table.component';
import { Pagination } from '../../interfaces/pagination.interface';

@Component({
  selector: 'shared-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent {
  @Input()
  public items: any[] = [];
  @Input()
  public columns?: { key: string, label: string }[];
  @Input()
  public baseRoute?: string;
  @Input()
  public listTitle?: string;
  @Input()
  public paginator!: Pagination<any>;
  public pageSize = 10;

  @Input()  // creo que no necesita el input
  public pageSizes: number[] = [5, 10, 15];

  @Input() actionsConfig?: ActionConfig[];



  @Output()
  public pageSizeChange = new EventEmitter<number>();


  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.pageSizeChange.emit(newSize);
  }

}
