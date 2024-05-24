import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { CropReportResponse, ProjectReportResponse } from '../../interfaces';

@Component({
  selector: 'app-project-report-info',
  templateUrl: './project-report-info.component.html',
})
export class ProjectReportInfoComponent {

  private reportService = inject( ReportService );
  private route         = inject( ActivatedRoute );
  private router        = inject( Router );
  public projectReport: ProjectReportResponse | undefined;
  public cropReportList?:      CropReportResponse[];

  public projectReportData: any;    //
  public buttons: any;              //

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      this.loadProjectReport(id);
      let token = localStorage.getItem('access_token');

      this.reportService.getCropReportPaginated(id, 0, 2, token).subscribe({
        next: (cropReportList)=> this.cropReportList = cropReportList.content,
        error: (err) => {
          console.log('error cargando los cultivos del proyecto: ', err);
        }
      });
    });

    this.buttons = [
      { label: 'Volver', class: 'btn-back', action: () => this.goBack() }
    ];
  }

  private loadProjectReport(id: number): void {
    let token = localStorage.getItem('access_token');
    this.reportService.getProjectReportById(id, token).subscribe({
      next: (projectReport) => {
        this.projectReport = projectReport;
        this.projectReportData = {
          detailTitle: 'Reporte de proyecto',
          imageUrl: projectReport.project.imageUrl,
          details: [
            { label: 'Inicio',            value: projectReport.project.startDate },
            { label: 'Municipio',         value: projectReport.project.municipality },
            { label: 'Presupuesto Total', value: projectReport.project.totalBudget },
            { label: 'Gastos Esperados',  value: projectReport.expectedExpense },
            { label: 'Gastos Reales',     value: projectReport.realExpense },
            { label: 'Ventas Totales',    value: projectReport.totalSale },
            { label: 'Ganancias',         value: projectReport.profit },
            { label: 'Rentabilidad',      value: projectReport.profitability }
          ],
        };
      },
      error: (error) => console.error('Failed to load projectReport', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/report/project']);
  }

}
