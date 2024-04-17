import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

const routes: Routes = [

  {
    path: 'home',
    //canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
  },

  {
    path: 'fertilizer',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./fertilizer/fertilizer.module').then( m => m.FertilizerModule ),
  },

  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },

  {
    path: '**',
    redirectTo: 'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
