import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private formBuilder = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  constructor() {}

  public myForm: FormGroup = this.formBuilder.group({
    email: ['admin@yopmail.com', [ Validators.required, Validators.email ]],
    password: ['password', [ Validators.required, Validators.minLength(8) ]],
  });

  public login() {
    const { email, password } = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/home'),
        error: (error) => {
          Swal.fire(error.message, error.description, 'error');
        }
      });
  }

}
