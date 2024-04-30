import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { isAuthenticatedGuard } from '../auth/guards';

const routes: Routes = [

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },

      {
        path: 'fertilizer',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../fertilizer/fertilizer.module').then(m => m.FertilizerModule)
      },

      {
        path: 'pesticide',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../pesticide/pesticide.module').then(m => m.PesticideModule)
      },

      {
        path: 'crop-type',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../crop-type/crop-type.module').then(m => m.CropTypeModule)
      },

      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
