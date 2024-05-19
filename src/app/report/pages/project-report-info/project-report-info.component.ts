import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../project/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectResponse } from '../../../project/interfaces';
import { ReportService } from '../../services/report.service';
import { CropReportResponse, ProjectReportResponse } from '../../interfaces';
import { CropResponse } from '../../../crop/interfaces';
import { CropService } from '../../../crop/services/crop.service';

@Component({
  selector: 'app-project-report-info',
  templateUrl: './project-report-info.component.html',
  styleUrl: './project-report-info.component.css'
})
export class ProjectReportInfoComponent {

  private reportService = inject( ReportService );
  private projectService = inject( ProjectService );
  private route         = inject( ActivatedRoute );
  private router        = inject( Router );
  public projectReport: ProjectReportResponse | undefined;
  public cropReportList?:      CropReportResponse[];


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      console.log('Project ID from URL:', id);

      this.loadProjectReport(id);
      let token = localStorage.getItem('access_token');

      this.reportService.getCropReportPaginated(id, 0, 2, token).subscribe({
        next: (cropReportList)=> {
          this.cropReportList = cropReportList.content;
          console.log('Crop Report List:', this.cropReportList); // Log para verificar lista de cultivos

        },
        error: (err) => {
          console.log('error cargando los cultivos del proyecto: ', err);
        }
      });
    });
  }

  private loadProjectReport(id: number): void {
    let token = localStorage.getItem('access_token');
    this.reportService.getProjectReportById(id, token).subscribe({
      next: (projectReport) => {
        this.projectReport = projectReport;
        console.log('Project Report:', this.projectReport); // Log para verificar reporte del proyecto
      },
      error: (error) => console.error('Failed to load projectReport', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/report/project']);
  }



}
