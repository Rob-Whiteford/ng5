import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CaptureWaybillComponent } from './capture-waybill/capture-waybill.component';
import { ViewWaybillsComponent } from './view-waybills/view-waybills.component';
import { ManifestsComponent } from './manifests/manifests.component';
import { HelpComponent } from './help/help.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about/:id',
    component: AboutComponent
  },
  {
    path: 'capture-waybill',
    component: CaptureWaybillComponent
  },
  {
    path: 'manifests',
    component: ManifestsComponent
  },
  {
    path: 'view-waybills',
    component: ViewWaybillsComponent
  },    
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'fetchdata',
    component: FetchDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
