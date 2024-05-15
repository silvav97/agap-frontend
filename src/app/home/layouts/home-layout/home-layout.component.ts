import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent implements OnInit, OnDestroy {

  private userSubscription?: Subscription;
  public user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('HomeLayoutComponent INICIALIZADO');

    this.userSubscription = this.authService.currentUser.subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  public logout() {
    this.authService.logout();
  }

}

