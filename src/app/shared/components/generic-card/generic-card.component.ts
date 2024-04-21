import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.css'
})
export class GenericCardComponent {

  @Input()
  public hero!: Hero;

  ngOnInit(): void {
    if ( !this.hero ) throw Error('Hero property is required');
  }

}


export interface Hero {
  id:               string;
  superhero:        string;
  publisher:        string;
  alter_ego:        string;
  first_appearance: string;
  characters:       string;
  alt_img?:         string;
}
