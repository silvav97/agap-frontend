import { Component, Input } from '@angular/core';
import { Fertilizer } from '../../../fertilizer/interfaces';

@Component({
  selector: 'shared-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {

  @Input()
  public fertilizers: Fertilizer[] = [];




}
