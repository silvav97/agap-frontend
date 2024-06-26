import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectResponse } from '../../interfaces/project-response.interface';
import { CardButton } from '../../../shared/components/generic-card/generic-card.component';
import { User } from '../../../auth/interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { Role } from '../../../shared/interfaces';
import { PageStateProjectService } from '../../../shared/services/page-state-project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit, OnDestroy {

  private pageStateProjectService = inject ( PageStateProjectService );
  private projectService   = inject( ProjectService );
  private authService      = inject( AuthService );
  private activatedRoute   = inject( ActivatedRoute );
  private router           = inject( Router );
  public baseRoute = '/project';

  public projectList: ProjectResponse[] = [];
  public paginator!: Pagination<ProjectResponse>;

  public pageSize?: number;
  public pageSizes = [2, 3];

  private userSubscription?: Subscription;
  public user: User | null = null;
  public roleAdmin = Role.ADMIN;

  constructor() {}

  ngOnInit(): void {
    this.pageStateProjectService.currentPageSizeProject.subscribe(size => {
      this.pageSize = size;

      this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
        this.user = currentUser;
      });
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;
        this.loadProjects(page);
      });
    });
  }

  loadProjects(page: number): void {
    let token = localStorage.getItem('access_token');
    this.projectService.getProjectPaginated(page, this.pageSize!, token).subscribe({
      next: (response) => {
        this.projectList = response.content;
        this.paginator   = response;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  public onPageSizeChange(newSize: number): void {
    //this.pageSize = newSize;
    this.pageStateProjectService.changePageSizeProject(newSize);
    this.loadProjects(0);
  }

  getCardFields(project: ProjectResponse): any[] {
    return [
       { label: 'Cultivo', value: project.cropType?.name },
       { label: 'Municipio', value: project.municipality },
    ];
  }

  getCardButtons(project: ProjectResponse): CardButton[] {
    return [
      { text: 'Más',              action: 'more',   visible: true,                                               style: 'btn-info', isDropdownItem: false },
      { text: 'Aplicar',          action: 'apply',  visible: true,                                               style: 'btn-info', isDropdownItem: false },
      { text: 'Editar',           action: 'edit',   visible: this.user?this.user!.roles.includes('ADMIN'):false, style: 'btn-card btn-regular', isDropdownItem: true },
      { text: 'Ver aplicaciones', action: 'seeApp', visible: this.user?this.user!.roles.includes('ADMIN'):false, style: 'btn-card btn-regular', isDropdownItem: true },
      { text: 'Finalizar',        action: 'finish', visible: this.user?this.user!.roles.includes('ADMIN'):false, style: 'btn-card btn-delete',  isDropdownItem: true },
      { text: 'Eliminar',         action: 'delete', visible: this.user?this.user!.roles.includes('ADMIN'):false, style: 'btn-card btn-delete',  isDropdownItem: true },
    ];
  }

  handleButtonClick(action: string, projectId: number): void {
    switch (action) {
      case 'more':
        this.onMore(projectId);
        break;
      case 'apply':
        this.onApply(projectId);
        break;
      case 'edit':
        this.onEdit(projectId);
        break;
      case 'seeApp':
        this.onSeeApp(projectId);
        break;
      case 'finish':
        break;
      case 'delete':
        this.onDelete(projectId);
        break;
      default:
        console.error('Acción no reconocida');
    }
  }

  public onMore(projectId: number) {
    this.router.navigate(['/project/info', projectId]);
  }

  public onApply(projectId: number) {
    this.router.navigate(['/project-application/new', projectId]);
  }

  public onSeeApp(projectId: number) {
    this.router.navigate(['/project-application/project', projectId]);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  navigateToNewProject(): void {
    this.router.navigate(['/project/new']);
  }

  public onDelete(id: number): void {
    let token = localStorage.getItem('access_token');
    this.projectService.getRelatedProjectApplications(id, token).subscribe({
      next: (relatedProjectApplications) => {
        let projectApplicationFarmNamesList = relatedProjectApplications.map(projectApplication => `- ${projectApplication}`).join('<br>');
        let warningMessage = relatedProjectApplications.length > 0
          ? `Desea eliminar el Proyecto con id: ${id}? Está asociado a las siguientes fincas:<br>${projectApplicationFarmNamesList}`
          : `Desea eliminar el Proyecto con id: ${id}?`;

        this.showDeletionDialog(id, warningMessage);
      },
      error: (error) => Swal.fire('Error', 'Error obteniendo Aplicaciones a proyecto relacionados al Proyecto', 'error'),
    });
  }

  private showDeletionDialog(id: number, message: string): void {
    Swal.fire({
      title: 'Está seguro?',
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProjectById(id);
      }
    });
  }

  private deleteProjectById(id: number): void {
    let token = localStorage.getItem('access_token');
    this.projectService.deleteProjectById(id, token).subscribe({
      next: () => {
        Swal.fire('Eliminado', `Proyecto ${id} eliminado con éxito!`, 'success');
        this.projectList = this.projectList.filter(project => project.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el Proyecto:', error);
        Swal.fire('Error', `Proyecto ${id} no pudo ser eliminado!`, 'error');
      }
    });
  }


}
