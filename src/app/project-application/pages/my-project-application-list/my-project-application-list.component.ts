import { Component, EventEmitter, inject } from '@angular/core';
import { ProjectApplicationResponse } from '../../interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { ProjectApplicationService } from '../../services/project-application.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApplicationStatus } from '../../../shared/interfaces';

@Component({
  selector: 'app-my-project-application-list',
  templateUrl: './my-project-application-list.component.html',
  styleUrl: './my-project-application-list.component.css'
})
export class MyProjectApplicationListComponent {

  private projectApplicationService = inject( ProjectApplicationService );
  private activatedRoute            = inject( ActivatedRoute );
  private router                    = inject( Router );

  public projectApplicationList: ProjectApplicationResponse[] = [];
  public paginator!: Pagination<ProjectApplicationResponse>;
  public baseRoute = '/project-application/mine';
  public listTitle = 'Aplicaciones a proyectos';
  public pageSize = 10;
  public pageSizes = [5, 10, 15];
  public actionsConfig: ActionConfig[] = [];

  public columns = [

    { key: 'project.name',         label: 'Proyecto' },
    { key: 'farmName',             label: 'Finca' },
    { key: 'area',                 label: 'Area' },
    { key: 'project.municipality', label: 'Municipio' },
    { key: 'applicationStatus',    label: 'Status' },
    { key: 'applicationDate',      label: 'applicationDate' },
    { key: 'applicant.firstName',  label: 'Aplicante' },

  ];

  ngOnInit(): void {
    this.setupActions();
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')! || 0;
      this.loadItems(page);
    });
  }

  loadItems(page: number): void {
    var token = localStorage.getItem('access_token')
    this.projectApplicationService.getMyProjectApplicationPaginated(page, this.pageSize, token).subscribe({
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
        label: 'Editar',
        type: 'rowAction',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus ===  ApplicationStatus.PENDIENTE,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-primary'
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === ApplicationStatus.PENDIENTE,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-warning'
      },

    ];

    this.actionsConfig[0].emitEvent.subscribe(id => {
      const projectApplication = this.projectApplicationList.find(app =>app.id === id);
      if (projectApplication && projectApplication.project) this.onEdit(projectApplication.id, projectApplication.project.id);
    });

    this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));

  }

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number, projectId: number): void {
    this.router.navigate([`project-application//edit`, id, projectId]);
  }

  public onDelete(id: number):void {
    Swal.fire({
      title: 'Está seguro?',
      text: `Desea eliminar la aplicación ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteApplicationById(id);
      }
    });
  }

  public deleteApplicationById(id: number): void {
    let token = localStorage.getItem('access_token');
    this.projectApplicationService.deleteProjectApplicationById(id, token).subscribe({
      next: () => {
        Swal.fire('Eliminado', `Aplicación ${id} eliminada con éxito!`, 'success');
        this.projectApplicationList = this.projectApplicationList.filter(projectApplication => projectApplication.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar La aplicación:', error);
        Swal.fire('Error', `La Aplicación ${id} no pudo ser eliminada!`, 'error');
      }
    });
  }

}