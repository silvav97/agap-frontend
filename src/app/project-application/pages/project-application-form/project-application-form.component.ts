import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/interfaces';
import { MunicipalityService } from '../../../shared/services/municipality.service';

@Component({
  selector: 'app-project-application-form',
  templateUrl: './project-application-form.component.html',
  styleUrl: './project-application-form.component.css'
})
export class ProjectApplicationFormComponent implements OnInit, OnDestroy {

  private projectApplicationService = inject( ProjectApplicationService);
  private municipalityService       = inject( MunicipalityService );
  private activatedRoute            = inject( ActivatedRoute);
  private authService               = inject( AuthService );
  private router                    = inject( Router);
  private fb                        = inject( FormBuilder );
  public municipalityOptions:       { value: number, label: string }[] = [];
  public form: FormGroup;
  public title: string = '';
  public projectId?: number;
  public applicationId?: number;
  public applicantId?: number;
  private userSubscription?: Subscription;
  public user: User | null = null;

  public formConfig: FieldConfig[] = [
    { type: 'text',   name: 'farmName',     label: 'Finca',     validators: [Validators.required] },
    { type: 'number', name: 'area',         label: 'Area',      validators: [Validators.required] },
    { type: 'select', name: 'municipality', label: 'Municipio', validators: [Validators.required], options: this.municipalityOptions },

  ];

  constructor() {
    this.form = this.fb.group({
      id:           [null],
      projectId:    [null, [Validators.required]],
      applicantId:  [null, [Validators.required]],
      farmName:     ['',   [Validators.required]],
      area:         [null, [Validators.required]],
      municipality: [null, [Validators.required]],
    });

    const token = localStorage.getItem('access_token');
    this.loadSelectOptions(token);
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
      this.applicantId = currentUser?.id;
      console.log(`El aplicante es ${this.user?.name} con id: ${this.applicantId}, y el id de proyecto es: ${this.projectId}`)
    });

    this.activatedRoute.params.subscribe(params => {
      this.projectId     = +params['projectId'];
      this.applicationId = +params['id'];
      console.log(`El aplicante es ${this.user?.name} con id: ${this.applicantId}, y el id de proyecto es: ${this.projectId}`)

      this.form.controls['projectId'].setValue(this.projectId);
      this.form.controls['applicantId'].setValue(this.applicantId);

      if ( this.applicationId ) {
        this.title = 'Editar Aplicación a Proyecto';
        this.loadProjectApplication(this.applicationId);
      } else {
        this.title = 'Aplicar a proyecto';
      }

      // Dejo esto de abajo? creo que si
      if ( !this.projectId ) {
        Swal.fire('Error', 'Proyecto no especificado', 'error').then(() => {
          this.router.navigateByUrl('/project');
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private loadSelectOptions(token: string | null): void {
    this.municipalityOptions = this.municipalityService.getAllMunicipalities().map(municipality => ({ value: municipality.id, label: municipality.name}));
    const municipalityField = this.formConfig.find(f => f.name === 'municipality');
    if ( municipalityField ) {
      municipalityField.options = this.municipalityOptions;
    }
  }

  loadProjectApplication(id: number): void {
    const token = localStorage.getItem('access_token');
    this.projectApplicationService.getProjectApplicationById(id, token).subscribe({
      next: (projectApplication) => {
        console.log('projectApplication: ', projectApplication);
        this.form.patchValue({
          ...projectApplication,
          municipality: this.getMunicipalityIdByName(projectApplication.project.municipality)?.id,
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la aplicación a proyecto', 'error');
        this.router.navigate(['/project']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    value.municipality = this.getMunicipalityNameById(value.municipality);

    const operation = this.form.get('id')?.value
      ? this.projectApplicationService.updateProjectApplication(value, token)
      : this.projectApplicationService.addProjectApplication(value, token);

    operation.subscribe({
      next: () => {
        if ( this.applicationId ) {
          Swal.fire('Éxito', `Ha editado la aplicación a este proyecto exitosamente`, 'success').then(() => this.router.navigateByUrl('/project-application/mine'));

        } else {
          Swal.fire('Éxito', `Ha aplicado a este proyecto, pronto nos pondremos en contacto`, 'success').then(() => this.router.navigateByUrl('/project'));
        }
      },
      error: (error) => {
        Swal.fire('Error', `Operación fallida, error: ${error.description}`, 'error');
        console.log({error})
      }
    });
  }

  getMunicipalityNameById(id: number): string {
    const municipality = this.municipalityService.getAllMunicipalities().find(m => Number(m.id) === Number(id));
    console.log("Municipio encontrado: ", municipality);
    return municipality ? municipality.name : '';
  }

  getMunicipalityIdByName(name: string) {
    const municipality = this.municipalityService.getAllMunicipalities().find(m => m.name === name);
    return municipality;
  }

}
