import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FertilizerService } from '../../services/fertilizer.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';

@Component({
  selector: 'app-fertilizer-form',
  templateUrl: './fertilizer-form.component.html',
  styleUrl: './fertilizer-form.component.css'
})
export class FertilizerFormComponent implements OnInit {

  public form: FormGroup;
  public title: string = '';

  public formConfig: FieldConfig[] = [
    { type: 'text', name: 'name', label: 'Nombre', validators: [Validators.required, Validators.maxLength(50)] },
    { type: 'text', name: 'brand', label: 'Marca', validators: [Validators.required] },
    { type: 'number', name: 'pricePerGram', label: 'Precio por Gramo', validators: [Validators.required, Validators.min(0)] }
  ];

  constructor(
    private fb: FormBuilder,
    private fertilizerService: FertilizerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      brand: ['', [Validators.required]],
      pricePerGram: ['', [Validators.required, Validators.min(0)]]
    });

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.title = 'Editar Fertilizante';
        this.loadFertilizer(id);
      } else {
        this.title = 'Agregar Fertilizante';
      }
    });
  }

  ngOnInit(): void {}

  loadFertilizer(id: number): void {
    const token = localStorage.getItem('access_token');
    this.fertilizerService.getFertilizerById(id, token).subscribe({
      next: (fertilizer) => this.form.patchValue(fertilizer),
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el fertilizante', 'error');
        this.router.navigate(['/fertilizer']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.fertilizerService.updateFertilizer(value, token)
      : this.fertilizerService.addFertilizer(value, token);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Fertilizante ${this.form.get('id')?.value ? 'actualizado' : 'creado'} con éxito!`, 'success').then(() => this.router.navigateByUrl('/fertilizer'));
      },
      error: () => {
        Swal.fire('Error', 'Operación fallida', 'error');
      }
    });
  }

}
