import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject( AuthService );
  private router      = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    console.log('finishedAuthCheck en app.component.ts: ', this.authService.authStatus());
    if ( this.authService.authStatus() == AuthStatus.checking ) {
      return false;
    }
    return true;
  });

  public authStatusChangedEffect = effect(() => {
    console.log('authStatus en app.component.ts: ', this.authService.authStatus());
    switch (this.authService.authStatus()) {

      case AuthStatus.checking:
          return;

      case AuthStatus.authenticated:
          // Si tengo guardado la url de a donde el usuario quería ir, lo redirijo ahí y listo.
          this.router.navigateByUrl('/fertilizer');
          return;

      case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth/login');
          return;
    }

  });

}
