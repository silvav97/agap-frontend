import { Component, inject } from '@angular/core';
import { MunicipalityService } from '../../../shared/services/municipality.service';
import { CropTypeService } from '../../../crop-type/services/crop-type.service';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environments';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';

@Component({
  selector: 'app-project-form-independiente',
  templateUrl: './project-form-independiente.component.html',
  styleUrl: './project-form-independiente.component.css'
})
export class ProjectFormIndependienteComponent {

  public url?: string;

  private municipalityService = inject( MunicipalityService );
  private cropTypeService     = inject( CropTypeService );
  private projectService      = inject( ProjectService );
  private activatedRoute      = inject( ActivatedRoute );
  private router              = inject( Router );
  private fb                  = inject( FormBuilder );
  public cropTypeOptions: { value: number, label: string }[] = [];
  public municipalityOptions: { value: number, label: string }[] = [];
  public form: FormGroup;
  public title: string = '';
  public formConfig!: FieldConfig[];

  public selectedFile: File | null = null;
  public baseUrl = environment.baseUrl;
  public urlBackendImage = `${this.baseUrl}/api/v1/project/imagen`;

  constructor() {
    this.form = this.fb.group({
      id:           [null],
      cropTypeId:   [null, [Validators.required]],
      name:         ['', [Validators.required]],
      startDate:    [null, [Validators.required]],
      endDate:      [null],
      municipality: [null, [Validators.required]],
      totalBudget:  ['', [Validators.required, Validators.min(0)]],
      imageUrl:     ['']
    });

    this.formConfig = [
      { type: 'select', name: 'cropTypeId', label: 'Tipo de Cultivo', validators: [Validators.required], options: this.cropTypeOptions },
      { type: 'text', name: 'name', label: 'Nombre del Proyecto', validators: [Validators.required] },
      { type: 'date', name: 'startDate', label: 'Fecha de Inicio', validators: [Validators.required] },
      { type: 'date', name: 'endDate', label: 'Fecha de Fin' },
      { type: 'select', name: 'municipality', label: 'Municipio', validators: [Validators.required], options: this.municipalityOptions },
      { type: 'number', name: 'totalBudget', label: 'Presupuesto', validators: [Validators.required, Validators.min(0)] },
    ];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.loadSelectOptions(token);

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.title = 'Editar Proyecto';
        this.loadProject(id);
      } else {
        this.title = 'Crear Proyecto';
      }
    });
  }

  private loadSelectOptions(token: string | null): void {
    this.cropTypeService.getCropTypeList(token).subscribe(cropTypes => {
      this.cropTypeOptions = cropTypes.map(ct => ({ value: ct.id, label: ct.name }));
      const cropTypeField = this.formConfig.find(f => f.name === 'cropTypeId');
      if (cropTypeField) {
        cropTypeField.options = this.cropTypeOptions;
      }
    });

    this.municipalityOptions = this.municipalityService.getAllMunicipalities().map(m => ({ value: m.id, label: m.name }));
    const municipalityField = this.formConfig.find(f => f.name === 'municipality');
    if (municipalityField) {
      municipalityField.options = this.municipalityOptions;
    }
  }

  loadProject(id: number): void {
    const token = localStorage.getItem('access_token');
    this.projectService.getProjectById(id, token).subscribe({
      next: (project) => {
        this.form.patchValue({
            ...project,
            cropTypeId: project.cropType?.id,
            municipality: this.getMunicipalityIdByName(project.municipality)?.id,
            imageUrl: project.imageUrl
        });
        this.url = project.imageUrl;
      },
      error: (error) => {
        Swal.fire('Error', 'No se pudo cargar el proyecto', 'error');
        this.router.navigate(['/project']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    value.municipality = this.getMunicipalityNameById(value.municipality);

    const isEditMode = !!this.form.get('id')?.value;

    if (this.selectedFile || isEditMode) {
      const operation = isEditMode
        ? (this.selectedFile
            ? this.projectService.updateProjectAndUploadFile(value, this.selectedFile, token)
            : this.projectService.updateProject(value, token))
        : this.projectService.saveProjectAndUploadFile(value, this.selectedFile!, token);

      operation.subscribe({
        next: () => {
          Swal.fire('Éxito', `Proyecto ${isEditMode ? 'actualizado' : 'creado'} con éxito!`, 'success').then(() => this.router.navigateByUrl('/project'));
        },
        error: (error) => {
          Swal.fire('Error', 'Operación fallida', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Debe seleccionar un archivo de imagen', 'error');
    }
  }

  getMunicipalityNameById(id: number): string {
    const municipality = this.municipalityService.getAllMunicipalities().find(m => Number(m.id) === Number(id));
    return municipality ? municipality.name : '';
  }

  getMunicipalityIdByName(name: string) {
    const municipality = this.municipalityService.getAllMunicipalities().find(m => m.name === name);
    return municipality;
  }

  public upload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
