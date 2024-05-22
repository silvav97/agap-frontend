import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../../../../environments/environments';


@Component({
  selector: 'shared-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.css'
})
export class GenericCardComponent {

  @Input() image?: string;
  @Input() title!: string;
  @Input() fields: CardField[] = [];
  @Input() buttons: CardButton[] = [];

  @Output() buttonClick = new EventEmitter<string>();

  public baseUrl = environment.baseUrl;
  public urlBackendImage = `${this.baseUrl}/api/v1/project/imagen`

  public onButtonClick(action: string): void {
    this.buttonClick.emit(action);
  }

  public hasDropdownItems(): boolean {
    return this.buttons.some(btn => btn.isDropdownItem && btn.visible);
  }

}

export interface CardField {
  label: string;
  value: any;
}

export interface CardButton {
  text: string;
  action: string;  // puede ser 'edit', 'more', 'delete', 'apply'
  visible: boolean;
  style?: string;
  isDropdownItem?: boolean;  // indica si el botón debe ir en la lista desplegable
}
