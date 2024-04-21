import { Component } from '@angular/core';
import { Hero } from '../../../shared/components/generic-card/generic-card.component';

@Component({
  selector: 'app-fertilizer-list',
  templateUrl: './fertilizer-list.component.html',
  styleUrl: './fertilizer-list.component.css'
})
export class FertilizerListComponent {

  constructor() {}

  ngOnInit(): void {
    //this.heroes =
    //this.heroesService.getHeroes().subscribe( response => this.heroes = response);
  }

public heroes: Hero[] =[
  {
      "id": "dc-batman",
      "superhero": "Batman",
      "publisher": "DC Comics",
      "alter_ego": "Bruce Wayne",
      "first_appearance": "Detective Comics #27",
      "characters": "Bruce Wayne"
  },
  {
      "id": "dc-superman",
      "superhero": "Superman",
      "publisher": "DC Comics",
      "alter_ego": "Kal-El",
      "first_appearance": "Action Comics #1",
      "characters": "Kal-El"
  },
  {
      "id": "dc-flash",
      "superhero": "Flash",
      "publisher": "DC Comics",
      "alter_ego": "Jay Garrick",
      "first_appearance": "Flash Comics #1",
      "characters": "Jay Garrick, Barry Allen, Wally West, Bart Allen"
  },
  {
      "id": "dc-green",
      "superhero": "Green Lantern",
      "publisher": "DC Comics",
      "alter_ego": "Alan Scott",
      "first_appearance": "All-American Comics #16",
      "characters": "Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz"
  },
  {
      "id": "dc-arrow",
      "superhero": "Green Arrow",
      "publisher": "DC Comics",
      "alter_ego": "Oliver Queen",
      "first_appearance": "More Fun Comics #73",
      "characters": "Oliver Queen"
  },
  {
      "id": "dc-wonder",
      "superhero": "Wonder Woman",
      "publisher": "DC Comics",
      "alter_ego": "Princess Diana",
      "first_appearance": "All Star Comics #8",
      "characters": "Princess Diana"
  },
  {
      "id": "dc-martian",
      "superhero": "Martian Manhunter",
      "publisher": "DC Comics",
      "alter_ego": "J\"onn J\"onzz",
      "first_appearance": "Detective Comics #225",
      "characters": "Martian Manhunter"
  },
  {
      "id": "dc-robin",
      "superhero": "Robin/Nightwing",
      "publisher": "DC Comics",
      "alter_ego": "Dick Grayson",
      "first_appearance": "Detective Comics #38",
      "characters": "Dick Grayson"
  }
]


}
