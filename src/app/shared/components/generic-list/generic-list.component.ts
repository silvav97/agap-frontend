import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  public paginator: any;
  public pageSize = 10;

  // @Input()
  // public addRoute?: string;


  @Input()  // creo que no necesita el input
  public pageSizes: number[] = [5, 10, 15];  // Default sizes



  @Output()
  public edit = new EventEmitter<number>();
  @Output()
  public delete = new EventEmitter<number>();
  @Output()
  public create = new EventEmitter<void>();
  @Output()
  public pageSizeChange = new EventEmitter<number>();


  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.pageSizeChange.emit(newSize);
  }

  onCreate(): void {
    this.create.emit();
  }
}
