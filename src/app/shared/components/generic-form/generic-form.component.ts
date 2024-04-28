import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FormConfig } from '../../interfaces/form-config.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormConfigService } from '../../services/form-config.service';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.css'
})
export class GenericFormComponent {
  public form!: FormGroup;
  public config!: FormConfig;
  public entityType!: string;
  public currentItem: any = {};


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formConfigService: FormConfigService
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit(): void {
    // Recuperamos el tipo de entidad desde la ruta si está definida allí
    this.activatedRoute.data.subscribe(data => {
      this.entityType = data['entityType'];
      this.config = this.formConfigService.getFormConfig(this.entityType);
      this.createForm();
    });

    // También maneja la carga de un item específico si 'id' es parte de la ruta
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadItem(id);
      }
    });
  }

  createForm(): void {
    this.config.fields.forEach(field => {
      this.form.addControl(field.name, new FormBuilder().control('', Validators.required)); // Ajusta según necesidades
    });
  }

  loadItem(id: number): void {
    // Simula cargar datos, aquí deberías llamar a tu servicio
    // Por ejemplo: this.yourService.getItemById(id).subscribe(item => {
    //   this.currentItem = item;
    //   this.form.patchValue(item);
    // });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    // Simula guardar o actualizar, según si el ID está presente o no
    console.log('Form Data:', this.form.value);
    Swal.fire({
      title: 'Éxito',
      text: this.form.get('id')?.value ? 'Actualizado con éxito' : 'Creado con éxito',
      icon: 'success',
    }).then(() => {
      this.router.navigateByUrl(`/${this.entityType}`);
    });
  }

}
