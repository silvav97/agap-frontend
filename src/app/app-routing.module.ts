import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    //canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
  },

  {
    path: 'auth',
    //canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },


  {
    path: 'fertilizer',
    //canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./fertilizer/fertilizer.module').then( m => m.FertilizerModule ),
  },

  {
    path: '**',
    redirectTo: 'index'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
