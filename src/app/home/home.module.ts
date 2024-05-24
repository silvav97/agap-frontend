import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectModule } from '../project/project.module';
import { ContactInfoComponent } from './pages/contact-info/contact-info.component';
import { SharedModule } from '../shared/shared.module';
import { AboutUsInfoComponent } from './pages/about-us-info/about-us-info.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent,
    ContactInfoComponent,
    AboutUsInfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProjectModule,
    SharedModule
  ]
})
export class HomeModule { }
