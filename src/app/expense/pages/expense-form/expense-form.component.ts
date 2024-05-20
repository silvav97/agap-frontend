import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interfaces';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  public form: FormGroup;
  public title: string = '';
  public cropId?: number;

  public formConfig: FieldConfig[] = [
    { type: 'select', name: 'expenseDescription', label: 'Tipo de gasto', validators: [Validators.required], options: [
      { value: 'PESTICIDA',    label: 'PESTICIDA'},
      { value: 'FERTILIZANTE', label: 'FERTILIZANTE' },
      { value: 'MANO_DE_OBRA', label: 'MANO DE OBRA' },
    ] },
    { type: 'number', name: 'expenseValue', label: 'Valor del Gasto', validators: [Validators.required, Validators.maxLength(50)] },
    { type: 'date',   name: 'expenseDate', label: 'Fecha Del Gasto', validators: [Validators.required, Validators.min(0)] }
  ];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id:                 [null],
      cropId:             [null, [Validators.required]],
      expenseValue:       ['', [Validators.required, Validators.maxLength(50)]],
      expenseDescription: ['', [Validators.required]],
      expenseDate:        [null, [Validators.required, Validators.min(0)]]
    });

    this.activatedRoute.params.subscribe(params => {
      this.cropId     = +params['cropId'];
      this.form.controls['cropId'].setValue(this.cropId);

      const id = params['id'];
      if (id) {
        this.title = 'Editar Gasto';
        this.loadExpense(id);
      } else {
        this.title = 'Agregar Gasto';
      }
    });
  }

  ngOnInit(): void {}

  loadExpense(id: number): void {
    const token = localStorage.getItem('access_token');
    this.expenseService.getExpenseById(id, token).subscribe({
      next: (expense) => this.form.patchValue(expense),
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el Gasto', 'error');
        this.router.navigate(['/crop/mine']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.expenseService.updateExpense(value, token)
      : this.expenseService.addExpense(value, token);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Gasto ${this.form.get('id')?.value ? 'actualizado' : 'creado'} con éxito!`, 'success')
        .then(() => this.router.navigate(['/expense/crop', this.cropId]));
      },
      error: () => {
        Swal.fire('Error', 'Operación fallida', 'error');
      }
    });
  }


}
