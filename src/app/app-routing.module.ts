import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

const routes: Routes = [

  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },

  {
    path: 'fertilizer',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./fertilizer/fertilizer.module').then( m => m.FertilizerModule ),
  },

  {
    path: '**',
    redirectTo: 'auth'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
