import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Fertilizer } from '../../../fertilizer/interfaces';
import { FertilizerService } from '../../../fertilizer/services/fertilizer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input()
  public items: any[] = [];
  @Input()
  public columns?: { key: string, label: string }[]; // Ejemplo: [{ key: 'name', label: 'Nombre' }]




  @Output()
  public edit = new EventEmitter<number>();
  @Output()
  public delete = new EventEmitter<number>();


}
