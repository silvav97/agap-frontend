import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CropTypeService } from '../../../crop-type/services/crop-type.service';
import { MunicipalityService } from '../../../shared/services/municipality.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {

  private municipalityService = inject( MunicipalityService );
  private cropTypeService     = inject( CropTypeService );
  private projectService      = inject( ProjectService);
  private activatedRoute      = inject( ActivatedRoute);
  private router              = inject( Router);
  private fb                  = inject( FormBuilder );
  public cropTypeOptions:     { value: number, label: string }[] = [];
  public municipalityOptions: { value: number, label: string }[] = [];
  public form: FormGroup;
  public title: string = '';

  public formConfig: FieldConfig[] = [
    { type: 'select', name: 'cropTypeId',   label: 'Tipo de Cultivo',     validators: [Validators.required], options: this.cropTypeOptions },
    { type: 'text',   name: 'name',         label: 'Nombre del Proyecto', validators: [Validators.required] },
    { type: 'date',   name: 'startDate',    label: 'Fecha de Inicio',     validators: [Validators.required] },
    { type: 'date',   name: 'endDate',      label: 'Fecha de Fin' },
    { type: 'select', name: 'municipality', label: 'Municipio',           validators: [Validators.required], options: this.municipalityOptions },
    { type: 'number', name: 'totalBudget',  label: 'Presupuesto',         validators: [Validators.required, Validators.min(0)] },
    { type: 'text',   name: 'imageUrl',     label: 'URL de la Imagen' }
  ];

  constructor() {
    this.form = this.fb.group({
      id:           [null],
      cropTypeId:   [null, [Validators.required]],
      name:         ['',   [Validators.required]],
      startDate:    [null, [Validators.required]],
      endDate:      [null],
      municipality: [null, [Validators.required]],
      totalBudget:  ['',   [Validators.required, Validators.min(0)]],
      imageUrl:     ['']
    });

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

  ngOnInit(): void {}

  private loadSelectOptions(token: string | null): void {
    this.cropTypeService.getCropTypeList(token).subscribe(cropTypes => {
      this.cropTypeOptions = cropTypes.map(ct => ({ value: ct.id, label: ct.name }));
      const cropTypeField = this.formConfig.find(fieldConfig => fieldConfig.name === 'cropTypeId');
      if ( cropTypeField ) {
        cropTypeField.options = this.cropTypeOptions;
      }
    });
    this.municipalityOptions = this.municipalityService
    .getAllMunicipalities().map(municipality => ({ value: municipality.id, label: municipality.name}));
    const municipalityField = this.formConfig.find(municipality => municipality.name === 'municipality');
    if ( municipalityField ) {
      municipalityField.options = this.municipalityOptions;
    }
  }

  loadProject(id: number): void {
    const token = localStorage.getItem('access_token');
    this.projectService.getProjectById(id, token).subscribe({
      next: (project) => this.form.patchValue({
          ...project,
          cropTypeId:   project.cropType?.id,
          municipality: this.getMunicipalityIdByName(project.municipality)?.id
      }),
      error: (error) => {
        Swal.fire('Error', 'No se pudo cargar el proyecto', 'error');
        console.log({'errorObtenido': error});
        this.router.navigate(['/project']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    value.municipality = this.getMunicipalityNameById(value.municipality);

    const operation = this.form.get('id')?.value
      ? this.projectService.updateProject(value, token)
      : this.projectService.addProject(value, token);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Proyecto ${this.form.get('id')?.value ? 'actualizado' : 'creado'} con éxito!`, 'success').then(() => this.router.navigateByUrl('/project'));
      },
      error: (error) => {
        console.log({'errorObtenido': error});
        Swal.fire('Error', 'Operación fallida', 'error');
      }
    });
  }

  getMunicipalityNameById(id: number): string {
    const municipality = this.municipalityService.getAllMunicipalities().find(m => Number(m.id) === Number(id));
    console.log("Municipio encontrado: ", municipality);
    return municipality ? municipality.name : '';
  }

  getMunicipalityIdByName(name: string) {
    const municipality = this.municipalityService.getAllMunicipalities().find( m => m.name === name );
    console.log("Municipio encontrado: ", municipality);
    return municipality;
  }

}
