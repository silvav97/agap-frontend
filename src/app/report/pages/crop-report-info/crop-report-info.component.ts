import { Component, inject } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ProjectService } from '../../../project/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CropReportResponse, ProjectReportResponse } from '../../interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crop-report-info',
  templateUrl: './crop-report-info.component.html',
  styleUrl: './crop-report-info.component.css'
})
export class CropReportInfoComponent {

  private reportService = inject( ReportService );
  private route         = inject( ActivatedRoute );
  private router        = inject( Router );
  public cropReport: CropReportResponse | undefined;
  public projectReportList: ProjectReportResponse[] = [];
  public projectReportId?: number;

  public cropReportData: any;       //
  public buttons: any;              //

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cropReportId = +params['id'];
      this.loadProjectReports(cropReportId);
    });

    this.buttons = [
      { label: 'Volver', class: 'btn btn-secondary', action: () => this.goBack() }
    ];
  }

  private loadProjectReports(cropReportId: number) {
    const token = localStorage.getItem('access_token');
    this.reportService.getProjectReportList(token).subscribe({
      next: (response) => {
        this.projectReportList = response;
        this.loadCropReport(cropReportId);
      },
      error: (error) => Swal.fire('Error', 'Error al cargar Reportes de Proyectos', 'error')
    });
  }

  private loadCropReport(id: number): void {
    const token = localStorage.getItem('access_token');
    this.reportService.getCropReportById(id, token).subscribe({
      next: (cropReport) => {
        this.cropReport = cropReport;
        const projectReport = this.projectReportList.find(pr => cropReport.crop.projectApplication.project.id === pr.project.id);
        this.projectReportId = projectReport?.id;
        this.cropReportData = {
          title: cropReport.crop.projectApplication.farmName,
          detailTitle: 'Detalles del Reporte de Cultivo',
          details: [
            { label: 'Estado', value: cropReport.crop.status },
            { label: 'Inicio', value: cropReport.crop.startDate },
            { label: 'Municipio', value: cropReport.crop.projectApplication.municipality },
            { label: 'Presupuesto Total', value: cropReport.crop.assignedBudget },
            { label: 'Gastos Esperados', value: cropReport.expectedExpense },
            { label: 'Gastos Reales', value: cropReport.realExpense },
            { label: 'Ventas Totales', value: cropReport.totalSale },
            { label: 'Ganancias', value: cropReport.profit },
            { label: 'Rentabilidad', value: cropReport.profitability }
          ],
          description: ''  // cropReport.description
        };
      },
      error: (error) => console.error('Failed to load cropReport', error)
    });
  }

  goBack(): void {
    console.log(' this.projectReportId es: ', this.projectReportId );
    this.router.navigate(['/report/project/info', this.projectReportId]);
  }

}
