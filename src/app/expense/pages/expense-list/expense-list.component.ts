import { Component, EventEmitter, inject } from '@angular/core';
import { PageStateService } from '../../../shared/services/page-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseResponse } from '../../interfaces';
import { Pagination } from '../../../shared/interfaces';
import { ActionConfig } from '../../../shared/components/generic-table/generic-table.component';
import { CropService } from '../../../crop/services/crop.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {

  private pageStateService = inject ( PageStateService );
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

    { key: 'expenseDescription', label: 'Tipo ' },
    { key: 'expenseValue',       label: 'Valor ' },
    { key: 'expenseDate',        label: 'Fecha del Gasto' },
  ];

  ngOnInit(): void {
    this.pageStateService.currentPageSize.subscribe(size => {
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
        buttonClass: 'btn-primary'
      },
      {
        label: 'Eliminar',
        type: 'rowAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-danger'
      },
      {
        label: 'Registrar Gasto',
        type: 'generalAction',
        visible: () => true,
        emitEvent: new EventEmitter<number | void>(),
        buttonClass: 'btn-add'
      },
    ];

    this.actionsConfig[0].emitEvent.subscribe(id => this.onEdit(id!));
    this.actionsConfig[1].emitEvent.subscribe(id => this.onDelete(id!));
    this.actionsConfig[2].emitEvent.subscribe(() => this.onCreate());

  }

  public onEdit(id: number): void {
    this.router.navigate([`${this.baseRoute}/edit`, id]);
  }

  public onDelete(id: number): void {
    //
  }

  public onCreate(): void {
    let id = this.selectedCropId;
    console.log('El selectedCropId es: ', id);
    this.router.navigate(['/expense/new', id]);
  }

  public onPageSizeChange(newSize: number): void {
    this.pageStateService.changePageSize(newSize);
    this.loadExpenses(0);
  }
}
