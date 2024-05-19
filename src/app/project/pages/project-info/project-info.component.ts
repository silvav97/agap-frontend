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


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // El signo + convierte la cadena a número
      this.loadProject(id);
    });
  }

  private loadProject(id: number): void {
    let token = localStorage.getItem('access_token');
    this.projectService.getProjectById(id, token).subscribe({
      next: (project) => this.project = project,
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
