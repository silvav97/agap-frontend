import { Component, EventEmitter, inject } from '@angular/core';
import { ProjectApplicationResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { ProjectResponse } from '../../../project/interfaces';
import { ProjectService } from '../../../project/services/project.service';
import { ApplicationStatus } from '../../../shared/interfaces/application-status.enum';
import { PageStateService } from '../../../shared/services/page-state.service';

@Component({
  selector: 'app-project-application-list',
  templateUrl: './project-application-list.component.html',
  styleUrl: './project-application-list.component.css'
})
export class ProjectApplicationListComponent {

  private projectApplicationService = inject( ProjectApplicationService );
  private pageStateService          = inject ( PageStateService );
  private projectService            = inject( ProjectService );
  private activatedRoute            = inject( ActivatedRoute );
  private router                    = inject( Router );
  public baseRoute = '/project-application';
  public listTitle = 'Aplicaciones a proyectos';

  public projectApplicationList: ProjectApplicationResponse[] = [];
  public projects: ProjectResponse[] = [];
  public paginator!: Pagination<ProjectApplicationResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];
  public currentPage: number = 0;
  public selectedProjectId?: number;

  public columns = [

    { key: 'project.name',         label: 'Proyecto' },
    { key: 'farmName',             label: 'Finca' },
    { key: 'area',                 label: 'Area' },
    { key: 'project.municipality', label: 'Municipio' },
    { key: 'applicationStatus',    label: 'Estado' },
    { key: 'applicationDate',      label: 'Fecha' },
    { key: 'applicant.firstName',  label: 'Aplicante' },

  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

      this.setupActions();
      this.loadProjects();
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;
        let projectId = +params.get('projectId')! || undefined;
        this.selectedProjectId = projectId;
        this.baseRoute = projectId ? `/project-application/project/${projectId}` : '/project-application';
        this.loadProjectApplications(page);
      });
    });
  }

  loadProjects(): void {
    var token = localStorage.getItem('access_token')
    this.projectService.getProjectList(token).subscribe({
      next: (projects) => this.projects = projects,
      error: (error) => Swal.fire('Error', 'Error al cargar los proyectos', 'error')
    });
  }

  loadProjectApplications(page: number): void {
    var token = localStorage.getItem('access_token')
    this.projectApplicationService.getProjectApplicationPaginated(page, this.pageSize!, token, this.selectedProjectId).subscribe({
      next: (response) => {
        this.projectApplicationList = response.content;
        this.paginator = response;
      },
      error: (error) => Swal.fire('Error', 'Error al cargar las aplicaciones', 'error')
    });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Aprobar',
        type: 'rowAction',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === ApplicationStatus.PENDIENTE,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-info'
      },
      {
        label: 'Rechazar',
        type: 'rowAction',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === ApplicationStatus.PENDIENTE,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.approveApplication(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.rejectApplication(id!));
  }

  public approveApplication(id: number) {
    this.router.navigate(['/crop/new', id]);
  }

  public rejectApplication(id: number) {
    Swal.fire({
      title: 'Está seguro?',
      text: `Desea rechazar el proyecto ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rejectApplicationById(id);
      }
    });
  }

  public rejectApplicationById(id: number) {
    let token = localStorage.getItem('access_token');
    this.currentPage = this.paginator.pageable.pageNumber;
    this.projectApplicationService.rejectProjectApplication(id, token).subscribe({
      next: () => {
        Swal.fire('Bien', `Aplicación rechazada exitosamente`, 'success');

        this.loadProjectApplications(this.currentPage);
      },
      error: (error) => {
        Swal.fire('Error', `La Aplicación al proyecto ${id} no pudo ser rechazada!`, 'error');
      }
    })
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadProjectApplications(0);
  }

  onProjectChange(projectId: number): void {
    this.router.navigate(['/project-application/project', projectId]);
  }

}
