import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { PesticideService } from '../../services/pesticide.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pesticide-form',
  templateUrl: './pesticide-form.component.html',
  styleUrl: './pesticide-form.component.css'
})
export class PesticideFormComponent implements OnInit {
  public form: FormGroup;
  public title: string = '';

  public formConfig = [
    { name: 'name', type: 'text', label: 'Name', validators: [Validators.required, Validators.maxLength(50)] },
    { name: 'brand', type: 'text', label: 'Brand', validators: [Validators.required] },
    { name: 'pricePerGram', type: 'number', label: 'Price Per Gram', validators: [Validators.required, Validators.min(0)] }
  ];

  constructor(
    private fb: FormBuilder,
    private pesticideService: PesticideService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      brand: ['', [Validators.required]],
      pricePerGram: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.title = 'Editar Pesticida';
        this.loadPesticide(id);
      } else {
        this.title = 'Agregar Pesticida';
      }
    });
  }

  loadPesticide(id: number) {
    const token = localStorage.getItem('access_token');
    this.pesticideService.getPesticideById(id, token).subscribe({
      next: (pesticide) => this.form.patchValue(pesticide),
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el pesticida', 'error');
        this.router.navigate(['/pesticide']);
      }
    });
  }

  handleSubmit() {
    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.pesticideService.updatePesticide(this.form.value, token)
      : this.pesticideService.addPesticide(this.form.value, token);

    operation.subscribe({
      next: () => {
        const message = this.form.get('id')?.value ? 'Pesticida actualizado' : 'Pesticida creado con éxito';
        Swal.fire('Éxito', message, 'success').then(() => this.router.navigateByUrl('/pesticide'));
      },
      error: () => Swal.fire('Error', 'Operación fallida', 'error')
    });
  }
}
