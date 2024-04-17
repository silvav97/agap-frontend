import { Component, OnDestroy, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { //implements OnInit, OnDestroy {
  //private authStatusSubscription?: Subscription;

  /*constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.authStatus.subscribe(status => {
      console.log('Auth Status in AppComponent: ', status);
      switch (status) {
        case AuthStatus.checking:
          break;
        case AuthStatus.authenticated:
          this.router.navigateByUrl('/fertilizer');
          break;
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth/login');
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.authStatusSubscription?.unsubscribe();
  }*/
}
