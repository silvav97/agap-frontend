import { Component, EventEmitter, inject } from '@angular/core';
import { ProjectApplicationResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';

@Component({
  selector: 'app-project-application-list',
  templateUrl: './project-application-list.component.html',
  styleUrl: './project-application-list.component.css'
})
export class ProjectApplicationListComponent {

  public projectApplicationList: ProjectApplicationResponse[] = [];
  public actionsConfig: ActionConfig[] = [];

  public columns = [

    { key: 'applicationStatus', label: 'Status' },
    { key: 'applicationDate',   label: 'applicationDate' },
    { key: 'applicant.firstName',      label: 'Aplicante' },
    { key: 'project.cropType.fertilizer.brand',      label: 'Proyecto' },

  ];

  public baseRoute = '/project-application';
  public listTitle = 'Aplicaciones a proyectos';
  public paginator!: Pagination<ProjectApplicationResponse>;

  private projectApplicationService = inject( ProjectApplicationService );
  private activatedRoute            = inject( ActivatedRoute );
  private router                    = inject( Router );
  public pageSize = 10;
  public pageSizes = [5, 10, 15];

  ngOnInit(): void {
    this.setupActions();
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page')! || 0;
      this.loadItems(page);
    });
  }

  loadItems(page: number): void {
    var token = localStorage.getItem('access_token')
    this.projectApplicationService.getProjectApplicationPaginated(page, this.pageSize, token)
      .subscribe( response => {
        console.log({response})
        this.projectApplicationList = response.content
        this.paginator = response;
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
      {
        label: 'Agregar ' + this.listTitle,
        type: 'generalAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-add'
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.approveApplication(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.rejectApplication(id!));
    this.actionsConfig[2].emitEvent.subscribe(() => this.onCreate());
  }

  public approveApplication(id: number) {
    Swal.fire('Bien', `Aplicacion con id ${id} ha sido aprobada`, 'success');
  }

  public rejectApplication(id: number) {
    Swal.fire('Bien', `Aplicacion con id ${id} ha sido rechazada`, 'info');
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
