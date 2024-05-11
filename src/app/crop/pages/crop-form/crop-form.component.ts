import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../auth/interfaces';
import { Subscription } from 'rxjs';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CropService } from '../../services/crop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crop-form',
  templateUrl: './crop-form.component.html',
  styleUrl: './crop-form.component.css'
})
export class CropFormComponent {

  private activatedRoute = inject( ActivatedRoute);
  private cropService    = inject( CropService);
  private router         = inject( Router);
  private fb             = inject( FormBuilder );
  public form: FormGroup;
  public title: string = '';
  public projectApplicationId?: number;
  public cropId?: number;

  public formConfig: FieldConfig[] = [
    { type: 'date',   name: 'startDate',       label: 'Fecha de inicio',      validators: [Validators.required] },
    { type: 'date',   name: 'endDate',         label: 'Fecha de fin',         validators: [Validators.required] },
    { type: 'number', name: 'expectedExpense', label: 'Gasto esperado',       validators: [Validators.required] },
    { type: 'number', name: 'assignedBudget',  label: 'Presupuesto asignado', validators: [Validators.required] },

  ];

  constructor() {
    this.form = this.fb.group({
      id:                   [null],
      projectApplicationId: [null, [Validators.required]],
      startDate:            [null, [Validators.required]],
      endDate:              [null, [Validators.required]],
      expectedExpense:      ['',   [Validators.required]],
      assignedBudget:       [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectApplicationId     = +params['projectApplicationId'];
      this.cropId = +params['id'];

      this.form.controls['projectApplicationId'].setValue(this.projectApplicationId);

      if ( this.cropId ) {
        this.title = 'Editar Cultivo';
        this.loadCrop(this.cropId);
      } else {
        this.title = 'Crear Cultivo';
      }

      if ( !this.projectApplicationId ) {
        Swal.fire('Error', 'Aplicación a Proyecto no especificada', 'error').then(() => {
          this.router.navigateByUrl('/project-application');
        });
      }
    });
  }


  loadCrop(id: number): void {
    const token = localStorage.getItem('access_token');
    this.cropService.getCropById(id, token).subscribe({
      next: (crop) => {
        this.form.patchValue(crop);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el cultivo', 'error');
        this.router.navigate(['/project-application']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.cropService.updateCrop(value, token)
      : this.cropService.addCrop(value, token);

    operation.subscribe({
      next: () => {
        if ( this.cropId ) {
          Swal.fire('Éxito', `Ha editado el cultivo exitosamente`, 'success').then(() => this.router.navigateByUrl('/crop'));

        } else {
          Swal.fire('Éxito', `Ha creado el cultivo exitosamente`, 'success').then(() => this.router.navigateByUrl('/crop'));
        }
      },
      error: (error) => {
        Swal.fire('Error', `Operación fallida, error: ${error.description}`, 'error');
        console.log({errorObtenidoAlEnviarForm: error})
      }
    });
  }


}
