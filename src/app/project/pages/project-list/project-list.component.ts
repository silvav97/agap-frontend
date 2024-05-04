import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectResponse } from '../../interfaces/project-response.interface';
import { CardButton } from '../../../shared/components/generic-card/generic-card.component';
import { User } from '../../../auth/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit, OnDestroy {

  private userSubscription?: Subscription;
  public user: User | null = null;
  projects: ProjectResponse[] = [];

  private projectService = inject( ProjectService );
  private authService    = inject( AuthService );
  private router         = inject( Router );

  constructor() {}

  ngOnInit(): void {
    this.loadProjects();
    this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  loadProjects(): void {
    let token = localStorage.getItem('access_token');
    this.projectService.getProjectList(token).subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
      }
    });
  }

  getCardFields(project: ProjectResponse): any[] {
    return [
      { label: 'Municipio', value: project.municipality },
      // { label: 'Presupuesto Total', value: `$${project.totalBudget}` },
      // { label: 'Fecha de Inicio', value: project.startDate },  // Asegúrate de que la fecha se muestre correctamente
      // { label: 'Estado', value: project.status }
    ];
  }

  getCardButtons(project: ProjectResponse): CardButton[] {
    return [
      { text: 'Más',              action: 'more',   visible: true,                               style: 'btn-card btn-regular', isDropdownItem: false },
      { text: 'Aplicar',          action: 'apply',  visible: true,                               style: 'btn-card btn-regular', isDropdownItem: false },
      { text: 'Editar',           action: 'edit',   visible: this.user!.roles.includes('ADMIN'), style: 'btn-card btn-regular', isDropdownItem: true },
      { text: 'Ver aplicaciones', action: 'verApp', visible: this.user!.roles.includes('ADMIN'), style: 'btn-card btn-regular', isDropdownItem:true },
      { text: 'Finalizar',        action: 'finish', visible: this.user!.roles.includes('ADMIN'), style: 'btn-card btn-delete',  isDropdownItem: true },
      { text: 'Eliminar',         action: 'delete', visible: this.user!.roles.includes('ADMIN'), style: 'btn-card btn-delete',  isDropdownItem: true },

    ];
  }

  handleButtonClick(action: string, projectId: number): void {
    switch (action) {
      case 'edit':
        // código para editar
        break;
      case 'more':
        // código para más detalles
        break;
      case 'delete':
        // código para eliminar
        break;
      case 'apply':
        this.onApply(projectId);
        break;
      default:
        console.error('Acción no reconocida');
    }
  }

  public onApply(projectId: number) {
    //Swal.fire('Bien', `Aplicaste al proyecto con id ${projectId}`, 'success');
    this.router.navigate(['/project-application/new', projectId]);
  }
}
