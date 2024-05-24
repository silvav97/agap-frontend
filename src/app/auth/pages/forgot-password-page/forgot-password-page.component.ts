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
    email: ['sesilvavi@gmail.com', [ Validators.required, Validators.email ]],
  });


  public forgotPassword() {
    const { email } = this.myForm.value;
    console.log({email});
    this.authService.forgotPassword(email).subscribe({
      next: (message) => {
        console.log({message})
        Swal.fire('Aviso', 'Verifique su cuenta para recuperar contraseña', 'success')
      },
      error: (error) => {
        console.log({error})
        Swal.fire(error, error, 'error')
      }
    })

  }

}
