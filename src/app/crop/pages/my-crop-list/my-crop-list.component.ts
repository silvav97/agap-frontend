import { Component, EventEmitter, inject } from '@angular/core';
import { PageStateService } from '../../../shared/services/page-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CropService } from '../../services/crop.service';
import { CropResponse } from '../../interfaces';
import { Pagination } from '../../../shared/interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';

@Component({
  selector: 'app-my-crop-list',
  templateUrl: './my-crop-list.component.html',
  styleUrl: './my-crop-list.component.css'
})
export class MyCropListComponent {

  private pageStateService = inject ( PageStateService );
  private activatedRoute   = inject( ActivatedRoute );
  private cropService      = inject( CropService );
  private router           = inject( Router );
  public baseRoute = '/crop/mine';
  public listTitle = 'Mis Cultivos';

  public cropList: CropResponse[] = []
  public paginator!: Pagination<CropResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  public columns = [
    { key: 'projectApplication.farmName',            label: 'Nombre' },
    { key: 'assignedBudget',                         label: 'Presupuesto asignado' },
    { key: 'status',                                 label: 'Estado' },
    { key: 'projectApplication.applicant.firstName', label: 'Usuario' },
  ];


  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

        this.setupActions();
        this.activatedRoute.paramMap.subscribe(params => {
          let page = +params.get('page')! || 0;
          this.loadCrops(page);
        });
      });
  }

  loadCrops(page: number): void {
    var token = localStorage.getItem('access_token')
    this.cropService.getMyCropPaginated(page, this.pageSize!, token)
      .subscribe( response => {
        this.cropList = response.content
        this.paginator = response;
      });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Gastos',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-info'
      },
      {
        label: 'Cerrar Cultivo',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-primary'
      },
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onSeeExpenses(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.onFinishCrop(id!));
  }

  public onFinishCrop(id: number): void {
    this.router.navigate([`${this.baseRoute}/close-crop`, id]);
  }

  public onSeeExpenses(id: number): void {
    console.log('Click on Ver Gastos');
    this.router.navigate(['expense/crop', id]);
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadCrops(0);
  }
}
