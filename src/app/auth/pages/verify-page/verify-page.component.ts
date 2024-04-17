import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrl: './verify-page.component.css'
})
export class VerifyPageComponent {

  private authService = inject( AuthService );
  private route = inject( ActivatedRoute );
  private router = inject( Router );
  public success: boolean = false;
  public message: string = '';


  constructor() {}

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.authService.verifyAccount(token).subscribe({
        next: (response) => {
          this.success = response;
          // Opcional: redirigir al usuario después de un cierto tiempo o basado en una acción
          //setTimeout(() => this.router.navigate(['/']), 3000);
        },
        error: (error) => {
          console.log({ error: 'Verification failed. Please try again.'+ error})
          this.success = false;
          this.message = error;
          //Swal.fire('Error', error, 'error');
        }
      });
    }
  }


}
