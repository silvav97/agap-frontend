import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'home', component: HomePageComponent },
      //{ path: 'register', component: RegisterPageComponent },
      { path: '**', redirectTo: 'home' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
