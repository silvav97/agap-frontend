import { Component, OnDestroy, OnInit } from '@angular/core';
import { FieldConfig } from '../../../shared/interfaces/field-config.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectApplicationService } from '../../services/project-application.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-project-application-form',
  templateUrl: './project-application-form.component.html',
  styleUrl: './project-application-form.component.css'
})
export class ProjectApplicationFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public title: string = '';
  public projectId?: number;
  public applicationId?: number;
  public applicantId?: number;
  private userSubscription?: Subscription;
  public user: User | null = null;

  public formConfig: FieldConfig[] = [
    { type: 'text', name: 'adminComment', label: 'Finca', validators: [Validators.required] },
    //{ type: 'text', name: 'brand', label: 'Marca', validators: [Validators.required] },
    //{ type: 'number', name: 'pricePerGram', label: 'Precio por Gramo', validators: [Validators.required, Validators.min(0)] }
  ];

  constructor(
    private fb: FormBuilder,
    private projectApplicationService: ProjectApplicationService,
    private authService:               AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id:           [null],
      projectId:    [null, [Validators.required]],
      applicantId:  [null, [Validators.required]],
      adminComment: ['', [Validators.required]],
      //brand: ['', [Validators.required]],
      //pricePerGram: ['', [Validators.required, Validators.min(0)]]
    });

    // this.activatedRoute.params.subscribe(params => {
    //   const id = params['id'];
    //   if (id) {
    //     this.title = 'Editar Aplicación a Proyecto';
    //     this.loadProjectApplication(id);
    //   } else {
    //     this.title = 'Aplicar a proyecto';
    //   }
    // });
  }

  ngOnInit(): void {
    // obtener el applicantId (userId)
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

  loadProjectApplication(id: number): void {
    const token = localStorage.getItem('access_token');
    this.projectApplicationService.getProjectApplicationById(id, token).subscribe({
      next: (projectApplication) => this.form.patchValue(projectApplication),
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la aplicación a proyecto', 'error');
        this.router.navigate(['/project']);
      }
    });
  }

  handleFormSubmit(value: any): void {
    const token = localStorage.getItem('access_token');
    const operation = this.form.get('id')?.value
      ? this.projectApplicationService.updateProjectApplication(value, token)
      : this.projectApplicationService.addProjectApplication(value, token);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Ha aplicado a este proyecto, pronto nos pondremos en contacto`, 'success').then(() => this.router.navigateByUrl('/project'));
      },
      error: (error) => {
        Swal.fire('Error', `Operación fallida, error: ${error.description}`, 'error');
      }
    });
  }


}
