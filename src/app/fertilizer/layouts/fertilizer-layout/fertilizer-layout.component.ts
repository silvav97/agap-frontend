import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-fertilizer-layout',
  templateUrl: './fertilizer-layout.component.html',
  styleUrl: './fertilizer-layout.component.css'
})
export class FertilizerLayoutComponent implements OnInit, OnDestroy {
  private userSubscription?: Subscription;
  public user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
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
