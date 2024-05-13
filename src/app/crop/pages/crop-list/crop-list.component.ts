import { Component, EventEmitter, inject } from '@angular/core';
import { CropResponse } from '../../interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { CropService } from '../../services/crop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.css'
})
export class CropListComponent {

  public cropList: CropResponse[] = []
  public actionsConfig: ActionConfig[] = [];

  public columns = [

    { key: 'projectApplication.farmName',       label: 'Nombre' },
    { key: 'assignedBudget', label: 'Presupuesto asignado' },
    { key: 'status', label: 'Estado' },

    { key: 'projectApplication.applicant.firstName', label: 'Usuario' },


  ];

  public baseRoute = '/crop';
  public listTitle = 'Cultivos';
  public paginator!: Pagination<CropResponse>;

  private cropService = inject( CropService );
  private activatedRoute  = inject( ActivatedRoute );
  private router          = inject( Router );
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
    this.cropService.getCropPaginated(page, this.pageSize, token)
      .subscribe( response => {
        this.cropList = response.content
        this.paginator = response;
        console.log({CropList: response.content})
      });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Editar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-primary'
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },

    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onEdit(id!));
    //this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));
  }

  public onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
    this.loadItems(0);
  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }


}
