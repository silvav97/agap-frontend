import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'shared-generic-info',
  templateUrl: './generic-info.component.html',
  styleUrl: './generic-info.component.css'
})
export class GenericInfoComponent {

  @Input() data!: InfoData;
  @Input() buttons?: InfoButton[];

  public baseUrl = environment.baseUrl;
  public urlBackendImage = `${this.baseUrl}/api/v1/project/imagen`



}





interface InfoDetail {
  label: string;
  value: string | number | Date;
}

interface InfoData {
  title: string;
  detailTitle: string;
  imageUrl?: string;
  details: InfoDetail[];
  description?: string;
}

interface InfoButton {
  label: string;
  class: string;
  action: () => void;
}
