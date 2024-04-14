import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-fertilizer-layout',
  templateUrl: './fertilizer-layout.component.html',
  styleUrl: './fertilizer-layout.component.css'
})
export class FertilizerLayoutComponent {

  private authService = inject( AuthService );
  public user = computed( () => this.authService.currentUser() );

  // get user2() {
  //   return this.authService.currentUser();
  // }

  public logout() {
    this.authService.logout();
  }

}
