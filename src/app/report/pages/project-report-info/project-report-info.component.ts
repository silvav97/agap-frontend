import { Component, inject } from '@angular/core';
import { ProjectService } from '../../../project/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { CropResponse } from '../../../crop/interfaces';
import { CropService } from '../../../crop/services/crop.service';
import { CropReportResponse, ProjectReportResponse } from '../../interfaces';

@Component({
  selector: 'app-project-report-info',
  templateUrl: './project-report-info.component.html',
  styleUrl: './project-report-info.component.css'
})
export class ProjectReportInfoComponent {

  private reportService = inject( ReportService );
  private route         = inject( ActivatedRoute );
  private router        = inject( Router );
  public projectReport: ProjectReportResponse | undefined;
  public cropReportList?:      CropReportResponse[];


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
  }

  private loadProjectReport(id: number): void {
    let token = localStorage.getItem('access_token');
    this.reportService.getProjectReportById(id, token).subscribe({
      next: (projectReport) => {
        this.projectReport = projectReport;
        console.log('Project Report:', this.projectReport);
      },
      error: (error) => console.error('Failed to load projectReport', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/report/project']);
  }



}
