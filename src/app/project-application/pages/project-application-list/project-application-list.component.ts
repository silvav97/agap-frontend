import { Component, EventEmitter, inject } from '@angular/core';
import { ProjectApplicationResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { ProjectResponse } from '../../../project/interfaces';
import { ProjectService } from '../../../project/services/project.service';

@Component({
  selector: 'app-project-application-list',
  templateUrl: './project-application-list.component.html',
  styleUrl: './project-application-list.component.css'
})
export class ProjectApplicationListComponent {

  public projects: ProjectResponse[] = [];
  public selectedProjectId?: number;
  public projectApplicationList: ProjectApplicationResponse[] = [];

  public actionsConfig: ActionConfig[] = [];

  public columns = [

    { key: 'project.name',      label: 'Proyecto' },
    { key: 'municipality',      label: 'Municipio' },

    { key: 'applicationStatus', label: 'Status' },
    { key: 'applicationDate',   label: 'applicationDate' },
    { key: 'applicant.firstName',      label: 'Aplicante' },
    //{ key: 'project.cropType.fertilizer.brand',      label: 'Marca de Fertilizante' },
    //{ key: 'farmName',      label: 'Finca' },



  ];

  public baseRoute = '/project-application';
  public listTitle = 'Aplicaciones a proyectos';
  public paginator!: Pagination<ProjectApplicationResponse>;

  private projectApplicationService = inject( ProjectApplicationService );
  private projectService            = inject( ProjectService );
  private activatedRoute            = inject( ActivatedRoute );
  private router                    = inject( Router );
  public pageSize = 10;
  public pageSizes = [5, 10, 15];
  public currentPage: number = 0;

  ngOnInit(): void {
    this.setupActions();
    this.loadProjects();
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')! || 0;
      this.selectedProjectId = +params.get('projectId')! || undefined;
      this.loadItems(page);
    });
  }

  loadProjects(): void {
    var token = localStorage.getItem('access_token')
    this.projectService.getProjectList(token).subscribe({
      next: (projects) => this.projects = projects,
      error: (error) => Swal.fire('Error', 'Error al cargar los proyectos', 'error')
    });
  }

  loadItems(page: number): void {
    var token = localStorage.getItem('access_token')
    this.projectApplicationService.getProjectApplicationPaginated(page, this.pageSize, token, this.selectedProjectId).subscribe({
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
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === 'PENDING',
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-primary'
      },
      {
        label: 'Rechazar',
        type: 'rowAction',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === 'PENDING',
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
      // NO DEBO TENER BOTON DE AGREGAR PROJECT APPLICATION YA QUE ESO SE HACE EN PROJECT, EN 'APLICAR'
      // {
      //   label: 'Agregar ' + this.listTitle,
      //   type: 'generalAction',
      //   visible: () => false,
      //   emitEvent: new EventEmitter<number | void>(),
      //   buttonClass: 'btn-add'
      // }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.approveApplication(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.rejectApplication(id!));
  }

  public approveApplication(id: number) {
    Swal.fire('Bien', `Aplicacion con id ${id} ha sido aprobada`, 'success');
  }

  public rejectApplication(id: number) {
    this.currentPage = this.paginator.pageable.pageNumber;
    var token = localStorage.getItem('access_token')
    this.projectApplicationService.rejectProjectApplication(id, token).subscribe({
      next: (response) => {
        Swal.fire('Bien', response.message, 'success');
        console.log({'result: ': 'bien'});
        this.loadItems(this.currentPage);
      },
      error: (error) => {
        console.log({'result: ': 'error: '+ error.description});
      }
    })
  }

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onDelete(id: number):void {

  }

  public onCreate(): void {

  }

}
