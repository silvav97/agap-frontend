import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {

  private formBuilder = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  constructor() {}

  public myForm: FormGroup = this.formBuilder.group({
    email: ['admin@yopmail.com', [ Validators.required, Validators.email ]],
  });


  public recoverPassword() {
    const { email } = this.myForm.value;
    this.authService.forgotPassword(email).subscribe({
      next: () => Swal.fire('Aviso', 'Verifique su cuenta para recuperar contraseña', 'info'),
      error: (error) => Swal.fire(error, error, 'error')
    })

  }

}
