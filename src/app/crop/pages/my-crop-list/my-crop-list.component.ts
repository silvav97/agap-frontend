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
    // Cambia a
    // my crops
    this.cropService.getMyCropPaginated(page, this.pageSize!, token)
      .subscribe( response => {
        this.cropList = response.content
        this.paginator = response;
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
        label: 'Gastos',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-info'
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },

    ];

    this.actionsConfig[0].emitEvent.subscribe(id => {
      const crop = this.cropList.find(c => c.id === id);
      if ( crop && crop.projectApplication ) this.onEdit(crop.id, crop.projectApplication.id)
    });
    this.actionsConfig[1].emitEvent.subscribe(id => this.onSeeExpenses(id!));
    this.actionsConfig[2].emitEvent.subscribe(id => this.onDelete(id!));

  }

  public onEdit(id: number, projectApplicationId: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id, projectApplicationId]);
  }
  public onDelete(id: number): void {
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