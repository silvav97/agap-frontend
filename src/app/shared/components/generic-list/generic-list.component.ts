import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ActionConfig } from '../generic-table/generic-table.component';
import { Pagination } from '../../interfaces/pagination.interface';
import { PageStateService } from '../../services/page-state.service';

@Component({
  selector: 'shared-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent implements OnInit {

  //private pageStateService = inject( PageStateService );
  @Input() public baseRoute?: string;
  @Input() public listTitle?: string;

  @Input() public items: any[] = [];
  @Input() public columns?: { key: string, label: string }[];
  @Input() public actionsConfig?: ActionConfig[];

  @Input() public pageSize: number = 10;
  @Input() public pageSizes?: number[] = [5, 10, 15];
  @Input() public paginator!: Pagination<any>;


  @Output() public pageSizeChange = new EventEmitter<number>();

  ngOnInit(): void {
    /*this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;
      this.pageSizeChange.emit(this.pageSize); ;
    });*/
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;

    //this.pageStateService.changePageSize(newSize);
    this.pageSizeChange.emit(newSize);
  }

}
