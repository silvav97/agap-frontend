import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fertilizer } from '../../interfaces';
import { FertilizerService } from '../../services/fertilizer.service';
import Swal from 'sweetalert2';
import { catchError, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fertilizer-form',
  templateUrl: './fertilizer-form.component.html',
  styleUrl: './fertilizer-form.component.css'
})
export class FertilizerFormComponent implements OnInit {

  private formBuilder       = inject( FormBuilder );
  private fertilizerService = inject( FertilizerService );
  private router            = inject( Router );
  private activatedRoute   = inject( ActivatedRoute );

  public fertilizerForm: FormGroup = this.formBuilder.group({
    id: [''],
    name: ['admin@yopmail.com', [ Validators.required ]],
    brand: ['admin@yopmail.com', [ Validators.required ]],
    pricePerGram: ['', [ Validators.required, Validators.pattern(/^\d+(\.\d+)?$/) ]],
  });

  get currentFertilizer(): Fertilizer {
    const fertilizer = this.fertilizerForm.value as Fertilizer;
    return fertilizer;
  }

  constructor() {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        let token = localStorage.getItem('access_token');
        this.fertilizerService.getFertilizerById(id, token).subscribe(fertilizer => {
          if (fertilizer) {
            this.fertilizerForm.patchValue(fertilizer);
          } else {
            this.router.navigate(['/fertilizer']);
          }
        });
      }
    });
  }



  public onSubmit() {
    let token = localStorage.getItem('access_token');
    let fertilizer : Fertilizer = this.currentFertilizer;

    if (this.fertilizerForm.invalid) return;

    const operation = fertilizer.id
      ? this.fertilizerService.updateFertilizer(fertilizer, token)
      : this.fertilizerService.addFertilizer(fertilizer, token);

    operation.subscribe({
      next: () => {
        const message = fertilizer.id ? 'Fertilizante actualizado' : 'Fertilizante creado con éxito';
        Swal.fire('Bien', message, 'success').then(() => {
          this.router.navigateByUrl('/fertilizer');
        });
      },
      error: () => Swal.fire('Error', 'Operación fallida', 'error')
    });
  }



}
