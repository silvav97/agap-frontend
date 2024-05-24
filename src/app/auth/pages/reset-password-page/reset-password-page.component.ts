import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent implements OnInit {

  private formBuilder = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private route = inject( ActivatedRoute );

  private token : string | null = null;


  constructor() {}

  public myForm: FormGroup = this.formBuilder.group({
    newPassword:          ['password2', [ Validators.required, Validators.minLength(8) ]],
    confirmationPassword: ['password2', [ Validators.required, Validators.minLength(8) ]],
  });

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    console.log('Atrapé el token: ',token);
    this.token = token;


  }

  public resetPassword() {
    if (this.token) {
      const { newPassword, confirmationPassword } = this.myForm.value;
      console.log({ newPassword, confirmationPassword, token: this.token });

      this.authService.resetPassword(newPassword, confirmationPassword, this.token).subscribe({
        next: (response) => {
          Swal.fire({
            title: '',
            text: 'Cambio de contraseña exitoso',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home']);
            }
          });
        },
        error: (error) => {
          console.log({ error: 'Reseteo de contraseña falló. Please try again.'+ error.message})
          //this.success = false;
          //this.message = error;
          Swal.fire('Error', 'Error al intentar restrablecer la contraseña', 'error');
        }
      });
    }
  }

}
