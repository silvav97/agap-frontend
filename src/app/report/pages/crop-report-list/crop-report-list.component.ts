import { Component, Input, inject, input } from '@angular/core';
import { PageStateService } from '../../../shared/services/page-state.service';
import { ActivatedRoute } from '@angular/router';
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


  public listTitle = 'Reporte de Proyectos';
  public cropReportList: CropReportResponse[] = [];
  public paginator!: Pagination<CropReportResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  @Input()
  public selectedProjectId?: number;

  @Input()
  public baseRoute?:string;   // = '/report/crop';



  public columns = [
    { key: 'crop.projectApplication.farmName',   label: 'Cultivo' },
    { key: 'totalSale',      label: 'Ventas Totales' },
    { key: 'profitability',  label: 'Rentabilidad' },
  ];

  ngOnInit(): void {
    console.log('Selected Project ID (from parent):', this.selectedProjectId); // Log para verificar el ID del proyecto recibido
    console.log('Base Route (from parent):', this.baseRoute); // Log para verificar el ID del proyecto recibido

    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;

        //let projectId = +params.get('projectId')! || undefined;
        //this.selectedProjectId = projectId;
        if (!this.selectedProjectId) {
          this.selectedProjectId = +params.get('projectId')!;
        }
        let projectId = this.selectedProjectId;

        console.log('Loading crop reports for project ID:', this.selectedProjectId); // Log para verificar el ID del proyecto usado en la carga

        //this.baseRoute = `/report/crop/${projectId}`;


        this.loadCropReports(page);
        var token = localStorage.getItem('access_token')

        this.reportService.getProjectReportById(projectId!, token).subscribe({
          next: (response) => {
            this.listTitle = "Reportes de cultivos de " + response.project.name;
            console.log("expense-list.   cropService.getCropById")
          },
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
        console.log('Loaded Crop Reports:', this.cropReportList); // Log para verificar la lista de reportes de cultivos

      },
      error: (error) => Swal.fire('Error', 'Error al cargar reportes de cultivos', 'error')
    });
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadCropReports(0);
  }

}
