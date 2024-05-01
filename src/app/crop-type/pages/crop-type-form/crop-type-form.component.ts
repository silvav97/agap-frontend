import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { CropTypeService } from '../../services/crop-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FertilizerService } from '../../../fertilizer/services/fertilizer.service';
import { PesticideService } from '../../../pesticide/services/pesticide.service';
import { CropTypeRequest } from '../../interfaces';

@Component({
  selector: 'app-crop-type-form',
  templateUrl: './crop-type-form.component.html',
  styleUrl: './crop-type-form.component.css'
})
export class CropTypeFormComponent implements OnInit {

  public form: FormGroup;
  public title: string = '';
  public fertilizerOptions: { value: number, label: string }[] = [];
  public pesticideOptions: { value: number, label: string }[] = [];
  public formConfig!: FieldConfig[];

  constructor(
    private fb: FormBuilder,
    private cropTypeService: CropTypeService,
    private fertilizerService: FertilizerService,
    private pesticideService: PesticideService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      weather: ['', [Validators.required]],
      plantQuantityPerSquareMeter: ['', [Validators.required, Validators.min(1)]],
      harvestTime: ['', [Validators.required, Validators.min(1)]],
      fertilizerQuantityPerPlant: ['', [Validators.required, Validators.min(0)]],
      fertilizerFrequency: ['', [Validators.required, Validators.min(1)]],
      pesticideQuantityPerPlant: ['', [Validators.required, Validators.min(0)]],
      pesticideFrequency: ['', [Validators.required, Validators.min(1)]],
      fertilizerId: ['', [Validators.required]],
      pesticideId: ['', [Validators.required]]
    });

    this.formConfig = [
      { type: 'text', name: 'name', label: 'Nombre del Cultivo', validators: [Validators.required, Validators.maxLength(100)] },
      { type: 'select', name: 'weather', label: 'Clima', validators: [Validators.required], options: [
          { value: 'CALIDO',  label: 'CALIDO'},
          { value: 'FRIO', label: 'FRIO' },
          { value: 'TEMPLADO', label: 'TEMPLADO' },
          { value: 'TROPICAL', label: 'TROPICAL' }
      ] },
      { type: 'number', name: 'plantQuantityPerSquareMeter', label: 'Plantas por m²', validators: [Validators.required, Validators.min(1)] },
      { type: 'number', name: 'harvestTime', label: 'Tiempo de Cosecha (días)', validators: [Validators.required, Validators.min(1)] },
      { type: 'number', name: 'fertilizerQuantityPerPlant', label: 'Fertilizante por Planta (g)', validators: [Validators.required, Validators.min(0)] },
      { type: 'number', name: 'fertilizerFrequency', label: 'Frecuencia de Fertilización (días)', validators: [Validators.required, Validators.min(1)] },
      { type: 'number', name: 'pesticideQuantityPerPlant', label: 'Pesticida por Planta (g)', validators: [Validators.required, Validators.min(0)] },
      { type: 'number', name: 'pesticideFrequency', label: 'Frecuencia de Pesticida (días)', validators: [Validators.required, Validators.min(1)] },
      { type: 'select', name: 'fertilizerId', label: 'Fertilizante', validators: [Validators.required], options: this.fertilizerOptions },
      { type: 'select', name: 'pesticideId', label: 'Pesticida', validators: [Validators.required], options: this.pesticideOptions }
    ];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.loadSelectOptions(token);
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.title = 'Editar Tipo de Cultivo';
        this.loadCropType(id);
      } else {
        this.title = 'Agregar Tipo de Cultivo';
      }
    });
  }

  private loadCropType(id: number): void {
    const token = localStorage.getItem('access_token');
    this.cropTypeService.getCropTypeById(id, token).subscribe({
      next: (cropType) => {
        this.form.patchValue({
          ...cropType,
          fertilizerId: cropType.fertilizer?.id,
          pesticideId: cropType.pesticide?.id
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el Tipo de Cultivo', 'error');
        this.router.navigate(['/crop-type']);
      }
    });
  }

  private loadSelectOptions(token: string | null): void {
    this.fertilizerService.getFertilizerList(token).subscribe(fertilizers => {
      this.fertilizerOptions = fertilizers.map(f => ({ value: f.id, label: f.name }));
      const fertilizerField = this.formConfig.find(f => f.name === 'fertilizerId');
      if (fertilizerField) {
        fertilizerField.options = this.fertilizerOptions;
      }
    });

    this.pesticideService.getPesticideList(token).subscribe(pesticides => {
      this.pesticideOptions = pesticides.map(p => ({ value: p.id, label: p.name }));
      const pesticideField = this.formConfig.find(p => p.name === 'pesticideId');
      if (pesticideField) {
        pesticideField.options = this.pesticideOptions;
      }
    });
  }

  handleFormSubmit(formValue: any): void {
    if (!this.form.valid) {
      Swal.fire('Atención', 'Formulario no válido, por favor revise los campos.', 'info');
      return;
    }
    const cropTypeRequest = {
      id: formValue.id,
      name: formValue.name,
      weather: formValue.weather,
      plantQuantityPerSquareMeter: formValue.plantQuantityPerSquareMeter,
      harvestTime: formValue.harvestTime,
      fertilizerQuantityPerPlant: formValue.fertilizerQuantityPerPlant,
      fertilizerFrequency: formValue.fertilizerFrequency,
      pesticideQuantityPerPlant: formValue.pesticideQuantityPerPlant,
      pesticideFrequency: formValue.pesticideFrequency,
      fertilizerId: Number(formValue.fertilizerId),
      pesticideId: Number(formValue.pesticideId),
    };

    console.log("Formulario a enviar:", cropTypeRequest); // Debugging: Muestra los valores que se enviarán

    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.cropTypeService.updateCropType(cropTypeRequest, token)
      : this.cropTypeService.addCropType(cropTypeRequest, token);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Tipo de Cultivo ${this.form.get('id')?.value ? 'actualizado' : 'creado'} con éxito!`, 'success').then(() => this.router.navigateByUrl('/crop-type'));
      },
      error: (error) => {
        console.error('Error during the save operation:', error);
        Swal.fire('Error', 'Operación fallida', 'error');
      }
    });
  }
}
