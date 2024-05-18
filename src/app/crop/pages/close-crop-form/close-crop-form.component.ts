import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CropService } from '../../services/crop.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-close-crop-form',
  templateUrl: './close-crop-form.component.html',
  styleUrl: './close-crop-form.component.css'
})
export class CloseCropFormComponent {

  private activatedRoute = inject( ActivatedRoute );
  private cropService    = inject( CropService );
  private router         = inject( Router );
  private fb             = inject( FormBuilder );
  public form: FormGroup;
  public title: string = 'Ingresar Valor de Ventas';
  public cropId?: number;

  public formConfig: FieldConfig[] = [
    { type: 'number', name: 'saleValue',  label: 'Valor de Ventas', validators: [Validators.required] },
  ];

  constructor() {
    this.form = this.fb.group({
      saleValue: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cropId = +params['id'];
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');


    this.cropService.finishCrop(this.cropId!, value.saleValue, token).subscribe({
      next: (response) => {
        console.log('response __obtenido__: ', response);
        Swal.fire('Éxito', `Ha ingresado el valor de ventas del cultivo exitosamente`, 'success').then(() => this.router.navigateByUrl('/crop/mine'));
      },
      error: (error) => {
        Swal.fire('Error', `Operación fallida, error: ${error.description}`, 'error');
        console.log({errorObtenidoAlEnviarForm: error})
      }
    });
  }


}


