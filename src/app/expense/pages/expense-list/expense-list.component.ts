import { Component, EventEmitter, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseResponse } from '../../interfaces';
import { Pagination } from '../../../shared/interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { CropService } from '../../../crop/services/crop.service';
import Swal from 'sweetalert2';
import { PageStateExpenseService } from '../../../shared/services/page-state-expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {

  private pageStateService = inject ( PageStateExpenseService );
  private expenseService   = inject( ExpenseService );
  private activatedRoute   = inject( ActivatedRoute );
  private cropService      = inject ( CropService );
  private router           = inject( Router );

  public baseRoute = '/expense';
  public listTitle = 'Gastos';

  public expenseList: ExpenseResponse[] = []
  public paginator!: Pagination<ExpenseResponse>;
  public actionsConfig: ActionConfig[] = [];

  public pageSize?: number;
  public pageSizes = [5, 6, 15];
  public selectedCropId?: number;


  public columns = [

    { key: 'expenseDescription', label: 'Tipo' },
    { key: 'expenseValue',       label: 'Valor' },
    { key: 'expenseDate',        label: 'Fecha' },
  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSizeExpense.subscribe(size => {
      this.pageSize = size;

        this.setupActions();
        this.activatedRoute.paramMap.subscribe(params => {
          let page = +params.get('page')! || 0;
          let cropId = +params.get('cropId')! || undefined;
          this.selectedCropId = cropId;
          this.baseRoute = cropId ? `/expense/crop/${cropId}` : '/expense';
          this.loadExpenses(page);
          var token = localStorage.getItem('access_token')
          this.cropService.getCropById(cropId!, token).subscribe({
            next: (response) => {
              this.listTitle = "Gastos de " + response.projectApplication.farmName;
              console.log("expense-list.   cropService.getCropById");
            },
            error:() => console.log("error"),
          });
        });
      });
  }


  loadExpenses(page: number): void {
    var token = localStorage.getItem('access_token')
    this.expenseService.getExpensesByCropIdPaginated(page, this.pageSize!, token, this.selectedCropId!)
      .subscribe( response => {
        this.expenseList = response.content
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
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
      {
        label: 'PDF',
        type: 'generalAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
      {
        label: 'Agregar',
        type: 'generalAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-add'
      },

    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onEdit(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));
    this.actionsConfig[2].emitEvent.subscribe(() => this.onPDFReport(this.selectedCropId!));
    this.actionsConfig[3].emitEvent.subscribe(() => this.onCreate());

  }

  public onEdit(id: number): void {
    this.router.navigate(['/expense/edit', id, this.selectedCropId]);
  }

  public onDelete(id: number): void {
    //
  }

  public onCreate(): void {
    let id = this.selectedCropId;
    console.log('El selectedCropId es: ', id);
    this.router.navigate(['/expense/new', id]);
  }

  public onPDFReport(id: number): void {
    Swal.fire({
      title: 'Introduce el nombre del archivo',
      input: 'text',
      inputLabel: 'Nombre del archivo (sin extensión)',
      inputPlaceholder: 'project_report',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes introducir un nombre para el archivo!';
        }
        return null;
      },
      customClass: {
        popup: 'swal2-custom-popup',
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const fileName = result.value;
        var token = localStorage.getItem('access_token');
        this.cropService.generatePDF(id, token).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.pdf`;  // Establecer el nombre ingresado por el usuario
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          },
          error: (error) => Swal.fire('Error', 'Error al generar el reporte PDF', 'error')
        });
      }
    });
  }


  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSizeExpense(newSize);
    this.loadExpenses(0);
  }
}
