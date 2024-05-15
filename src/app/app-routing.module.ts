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
    path: '',
    //pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
  },

  // {
  //   path: '',
  //   pathMatch:'full',
  //   redirectTo: 'home'
  // },


  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  ngOnInit(): void {
    console.log('AppRoutingModule INICIALIZADO');
  }

}
