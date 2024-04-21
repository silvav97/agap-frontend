import { Component, Input } from '@angular/core';
import { Fertilizer } from '../../../fertilizer/interfaces';

@Component({
  selector: 'shared-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.css'
})
export class GenericCardComponent {

  @Input()
  public fertilizer!: Fertilizer;

  ngOnInit(): void {
    if ( !this.fertilizer ) throw Error('Fertilizer property is required');
  }

}

