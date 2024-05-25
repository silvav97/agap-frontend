import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {

  private router = inject( Router );

  public contactData = {
    title: 'Contacto',
    detailTitle: 'Detalles de Contacto',
    details: [
      { label: 'Dirección', value: 'Calle 43 # 100-1, Medellin, Colombia' },
      { label: 'Teléfono', value: '(+57) 360 345 20 21' },
      { label: 'Correo Electrónico', value: 'ensinso@gmail.com' },
      { label: 'Horario de Atención', value: 'Lunes a Viernes, 9:00 AM - 6:00 PM' },
      { label: 'Instagram', value: '@AgapUmata999' }

    ],
    description: 'Si tiene alguna pregunta o necesita asistencia, no dude en contactarnos a través de los medios mencionados.'
  };

  public buttons = [
    { label: 'Volver', class: 'btn-back', action: () => this.goBack() }
  ];

  goBack(): void {
    this.router.navigateByUrl("/home");
  }
}
