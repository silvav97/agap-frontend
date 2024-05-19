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
  private projectService = inject( ProjectService );
  private route         = inject( ActivatedRoute );
  private router        = inject( Router );
  public cropReport: CropReportResponse | undefined;
  public projectReportList: ProjectReportResponse[] = [];
  public projectReportId?: number;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const cropReportId = +params['id'];

      this.loadProjectReports(cropReportId);
    });
  }

  private loadProjectReports(cropReportId: number) {
    var token = localStorage.getItem('access_token')
    this.reportService.getProjectReportList(token).subscribe({
      next: (response) => {
        this.projectReportList = response;
        console.log('response es: ', response);
        this.loadCropReport(cropReportId);
      },
      error: (error) => Swal.fire('Error', 'Error al cargar Reportes de Proyectos', 'error')
    });
  }

  private loadCropReport(id: number): void {
    let token = localStorage.getItem('access_token');
    this.reportService.getCropReportById(id, token).subscribe({
      next: (cropReport) => {
        this.cropReport = cropReport;
        let projectReport = this.projectReportList.find(pr => cropReport.crop.projectApplication.project.id === pr.project.id);
         this.projectReportId = projectReport?.id;
        console.log('Crop Report:', this.cropReport);
        console.log('EL Crop Report es del crop que pertenece al Project:', projectReport?.project.name);

      },
      error: (error) => console.error('Failed to load cropReport', error)
    });
  }

  goBack(): void {
    console.log(' this.projectReportId es: ', this.projectReportId );
    this.router.navigate(['/report/project/info', this.projectReportId]);
  }

}//
