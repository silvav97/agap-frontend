import { Component, EventEmitter, inject } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { PageStateService } from '../../../shared/services/page-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectReportResponse } from '../../interfaces';
import { Pagination } from '../../../shared/interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-report-list',
  templateUrl: './project-report-list.component.html',
  styleUrl: './project-report-list.component.css'
})
export class ProjectReportListComponent {

  private pageStateService = inject ( PageStateService );
  private activatedRoute   = inject( ActivatedRoute );
  private reportService    = inject( ReportService );
  private router           = inject( Router );
  public baseRoute = '/report/project';
  public listTitle = 'Reporte de Proyectos';
  public projectReportList: ProjectReportResponse[] = [];
  public paginator!: Pagination<ProjectReportResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];

  public columns = [
    { key: 'project.name',   label: 'Proyecto' },
    { key: 'totalSale',      label: 'Ventas Totales' },
    { key: 'profitability',  label: 'Rentabilidad' },
  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
      this.pageSize = size;

      this.setupActions();
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page')! || 0;
        this.loadProjectReports(page);
      });
    });
  }

  loadProjectReports(page: number): void {
    var token = localStorage.getItem('access_token')
    this.reportService.getProjectReportPaginated(page, this.pageSize!, token).subscribe({
      next: (response) => {
        this.projectReportList = response.content;
        this.paginator = response;
      },
      error: (error) => Swal.fire('Error', 'Error al cargar Reportes de Proyectos', 'error')
    });
  }

  private setupActions(): void {
    this.actionsConfig = [
      {
        label: 'Info',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-info'
      }
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onInfo(id!));
  }

  public onInfo(id: number): void {
    this.router.navigate([`${this.baseRoute}/info`, id]);
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadProjectReports(0);
  }


}
