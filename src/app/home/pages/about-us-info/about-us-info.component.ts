import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-info',
  templateUrl: './about-us-info.component.html',
  styleUrl: './about-us-info.component.css'
})
export class AboutUsInfoComponent {

  private router = inject( Router );

  public aboutUsData = {
    description: [
      `La aplicación AGAP tiene como misión revolucionar y centralizar la administración de proyectos agrícolas en Antioquia, facilitando la comunicación entre los formuladores de proyectos de la UMATA y los agricultores de pequeña y mediana escala. AGAP se caracteriza por su enfoque personalizado, permitiendo la elaboración de proyectos detallados que consideran las especificidades de cada región, incluyendo factores como el clima y el tipo de cultivo. La aplicación guía a los agricultores en las "acciones importantes para el cultivo", desde el calendario de fertilización hasta las estrategias para el control de plagas, maximizando el rendimiento de cada cosecha.`,
      `AGAP facilita la trazabilidad completa de cada subproyecto, permitiendo un registro detallado de los gastos y costos, y evaluando la rentabilidad al final del ciclo de cultivo. La aplicación ofrece herramientas para los formuladores de proyectos, permitiendo administrar cada proyecto de manera eficiente y adaptable según las circunstancias. AGAP también promueve la creación de perfiles detallados tanto para los formuladores de proyectos como para los agricultores, centralizando toda la información necesaria para una gestión eficaz. En conclusión, AGAP surge como una herramienta integral diseñada para optimizar la gestión de proyectos agrícolas, facilitando la planificación, ejecución y análisis de proyectos, y promoviendo una agricultura más sostenible y rentable.`
    ]
  };

  public buttons = [
    { label: 'Volver', class: 'btn-back', action: () => this.goBack() }
  ];

  goBack(): void {
    this.router.navigateByUrl("/home");
  }
}
