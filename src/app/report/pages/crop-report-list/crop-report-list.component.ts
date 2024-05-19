import { Component, EventEmitter, Input, inject, input } from '@angular/core';
import { PageStateService } from '../../../shared/services/page-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { CropReportResponse } from '../../interfaces';
import { Pagination } from '../../../shared/interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crop-report-list',
  templateUrl: './crop-report-list.component.html',
  styleUrl: './crop-report-list.component.css'
})
export class CropReportListComponent {

  private pageStateService = inject ( PageStateService );
  private activatedRoute   = inject( ActivatedRoute );
  private reportService    = inject( ReportService );
  private router           = inject( Router );
  public listTitle = 'Reporte de Proyectos';
  public cropReportList: CropReportResponse[] = [];
  public paginator!: Pagination<CropReportResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number = 5;
  public pageSizes = [5, 6, 15];
  @Input()
  public selectedProjectId?: number;
  @Input()
  public baseRoute?:string;

  public columns = [
    { key: 'crop.projectApplication.farmName',   label: 'Cultivo' },
    { key: 'totalSale',      label: 'Ventas Totales' },
    { key: 'profitability',  label: 'Rentabilidad' },
  ];

  ngOnInit(): void {
    let projectId = this.selectedProjectId;
    var token = localStorage.getItem('access_token')

    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

      this.setupActions();
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;
        this.loadCropReports(page);

        this.reportService.getProjectReportById(projectId!, token).subscribe({
          next: (response) => this.listTitle = "Reportes de cultivos de " + response.project.name,
          error:(err) => console.log("error: ", err),
        });
      });
    });
  }

  loadCropReports(page: number): void {
    var token = localStorage.getItem('access_token')
    this.reportService.getCropReportPaginated(this.selectedProjectId!, page, this.pageSize!, token).subscribe({
      next: (response) => {
        this.cropReportList = response.content;
        this.paginator = response;
      },
      error: (error) => Swal.fire('Error', 'Error al cargar reportes de cultivos', 'error')
    });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Info',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-primary'
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onInfo(id!));
  }

  public onInfo(id: number): void {
    this.router.navigate([`report/crop/info`, id]);
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadCropReports(0);
  }

}
