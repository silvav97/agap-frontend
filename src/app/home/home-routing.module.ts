import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { isAuthenticatedGuard } from '../auth/guards';
import { roleGuard } from '../auth/guards/role.guard';

const routes: Routes = [

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },

      {
        path: 'fertilizer',

        //canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../fertilizer/fertilizer.module').then(m => m.FertilizerModule)
      },

      {
        path: 'pesticide',
        //canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../pesticide/pesticide.module').then(m => m.PesticideModule)
      },

      {
        path: 'crop-type',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../crop-type/crop-type.module').then(m => m.CropTypeModule)
      },

      {
        path: 'project',
       //canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../project/project.module').then(m => m.ProjectModule)
      },

      {
        path: 'project-application',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../project-application/project-application.module').then(m => m.ProjectApplicationModule)
      },

      {
        path: 'crop',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../crop/crop.module').then(m => m.CropModule)
      },

      {
        path: 'expense',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../expense/expense.module').then(m => m.ExpenseModule)
      },

      {
        path: 'report',
        canActivate: [ isAuthenticatedGuard ],
        loadChildren: () => import('../report/report.module').then(m => m.ReportModule)
      },

      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {

  ngOnInit(): void {
    console.log('HomeRoutingModule INICIALIZADO');
  }

}
