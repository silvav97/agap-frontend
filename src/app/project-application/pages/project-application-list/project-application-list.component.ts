import { Component, EventEmitter, inject } from '@angular/core';
import { ProjectApplicationResponse } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-project-application-list',
  templateUrl: './project-application-list.component.html',
  styleUrl: './project-application-list.component.css'
})
export class ProjectApplicationListComponent {

  public projectApplicationList: ProjectApplicationResponse[] = [];
  public actionsConfig: ActionConfig[] = [];

  public columns = [
    { key: 'id',      label: 'Aplication id' },
    { key: 'applicationStatus', label: 'Status' },
    { key: 'applicationDate',   label: 'applicationDate' },

  ];

  public baseRoute = '/project-application';
  public listTitle = 'Aplicaciones a proyectos';
  public paginator: any;

  private activatedRoute   = inject( ActivatedRoute );
  private router           = inject( Router );
  private projectApplicationService = inject( ProjectApplicationService );

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
        this.paginator = {
                content: response.content,
                pageable: response.pageable,
                last: response.last,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                size: response.size,
                number: response.number,
                sort: response.sort,
                first: response.first,
                numberOfElements: response.numberOfElements,
                empty: response.empty
        };
      });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Aprobar',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === 'PENDING',
        emitEvent: new EventEmitter<number>()
      },
      {
        label: 'Rechazar',
        visible: (item: ProjectApplicationResponse) => item.applicationStatus === 'PENDING',
        emitEvent: new EventEmitter<number>()
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.approveApplication(id));
    this.actionsConfig[1].emitEvent.subscribe(id => this.rejectApplication(id));
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
