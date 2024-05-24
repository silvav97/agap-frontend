import { Component, OnInit, inject } from '@angular/core';
import { ProjectResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.css'
})
export class ProjectInfoComponent implements OnInit  {

  private projectService = inject( ProjectService );
  private route          = inject( ActivatedRoute );
  private router         = inject( Router );
  public project: ProjectResponse | undefined;

  public projectData: any;  //
  public buttons: any;      //

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProject(id);
    });

    this.buttons = [
      { label: 'Volver', class: 'btn-back', action: () => this.goBack() },
      { label: 'Aplicar', class: 'btn-warning', action: () => this.applyToProject(this.project!.id) }
    ];
  }

  private loadProject(id: number): void {
    let token = localStorage.getItem('access_token');
    this.projectService.getProjectById(id, token).subscribe({
      next: (project) => {
        this.project = project;
        this.projectData = {
          title: project.name,
          detailTitle: 'Detalles del Proyecto',
          imageUrl: project.imageUrl,
          details: [
            { label: 'Nombre', value: project.name },
            { label: 'Inicio', value: project.startDate },
            { label: 'Municipio', value: project.municipality },
            { label: 'Fin', value: project.endDate },
            { label: 'Presupuesto Total', value: project.totalBudget },
            { label: 'Cultivo', value: project.cropType?.name }
          ],
          description:  '' //project.description
        };
      },
      error: (error) => console.error('Failed to load project', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/project']);
  }

  applyToProject(projectId: number): void {
    this.router.navigate(['/project-application/new', projectId]);
  }

}
