import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'shared-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent {
  @Input() items: any[] = [];
  @Input() columns?: { key: string, label: string }[];
  @Input() actionsConfig?: ActionConfig[] = [];

  public resolveNestedProperty(item: any, path: string): any {
    return path.split('.').reduce((o, i) => o && o[i], item);
  }

}


export interface ActionConfig {
  label: string;
  type?: 'rowAction' | 'generalAction';
  visible: (item?: any) => boolean;   // es una funcion aunque podría ser un booleano si quisiera.
  emitEvent: EventEmitter<number | void>;
  buttonClass?: string;
}
