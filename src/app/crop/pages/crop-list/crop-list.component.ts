import { Component, EventEmitter, inject } from '@angular/core';
import { CropResponse } from '../../interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { CropService } from '../../services/crop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageStateService } from '../../../shared/services/page-state.service';

@Component({
  selector: 'app-crop-list',
  templateUrl: './crop-list.component.html',
  styleUrl: './crop-list.component.css'
})
export class CropListComponent {

  private pageStateService = inject ( PageStateService );
  private activatedRoute   = inject( ActivatedRoute );
  private cropService      = inject( CropService );
  private router           = inject( Router );
  public baseRoute = '/crop';
  public listTitle = 'Cultivos';

  public cropList: CropResponse[] = []
  public paginator!: Pagination<CropResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  public columns = [
    { key: 'projectApplication.farmName',            label: 'Nombre' },
    { key: 'projectApplication.project.id',            label: 'Proyecto' },
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
    this.cropService.getCropPaginated(page, this.pageSize!, token)
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
        buttonClass: 'btn-info'
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => {
      const crop = this.cropList.find(c => c.id === id);
      if ( crop && crop.projectApplication ) this.onEdit(crop.id, crop.projectApplication.id)
    });
  }

  public onEdit(id: number, projectApplicationId: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id, projectApplicationId]);
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadCrops(0);
  }

}
