import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterResponse } from '../../interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private formBuilder = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  constructor() {}

  public myForm: FormGroup = this.formBuilder.group({
    firstname: ['sebastian', [ Validators.required ]],
    lastname: ['silva', [ Validators.required ]],
    email: ['sesilvavi@gmail.com', [ Validators.required, Validators.email ]],
    password: ['password', [ Validators.required, Validators.minLength(8) ]],
  });

  public register() {
    const { firstname, lastname, email, password } = this.myForm.value;
    this.authService.register( firstname, lastname, email, password)
      .subscribe({
        next: (registerResponse: RegisterResponse) => {
          Swal.fire('Mira', 'Ve al correo a confirmar la cuenta Bitch!', 'success');
          this.router.navigateByUrl('/home');
        },
        error: (error) => {
          Swal.fire(error.message, error.description, 'error');
        }
      });
  }

}
