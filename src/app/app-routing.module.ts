import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CaptureWaybillComponent } from './capture-waybill/capture-waybill.component';
import { ViewWaybillsComponent } from './view-waybills/view-waybills.component';
import { ViewManifestsComponent } from './view-manifests/view-manifests.component';
import { HelpComponent } from './help/help.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { ScanBarcodeComponent } from './scan-barcode/scan-barcode.component';
import { DemoComponent } from './demo/demo.component';
import { ViewSitesComponent } from './view-sites/view-sites.component';
import { CreateManifestComponent } from './create-manifest/create-manifest.component';
import { SiteDetailsComponent } from './site-details/site-details.component';
import { ManifestDetailsComponent } from './manifest-details/manifest-details.component';
import { OptionsPrintingComponent } from './options-printing/options-printing.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    path: 'view-manifests',
    component: ViewManifestsComponent
  },
  {
    path: 'create-manifest',
    component: CreateManifestComponent
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
    path: 'scan-barcode',
    component: ScanBarcodeComponent
  },  
  {
    path: 'demo',
    component: DemoComponent
  },  
  {
    path: 'view-sites',
    component: ViewSitesComponent
  },
  {
    path: 'site-details',
    component: SiteDetailsComponent
  },  
  {
    path: 'manifest-details',
    component: ManifestDetailsComponent
  },  
  {
    path: 'options-printing',
    component: OptionsPrintingComponent
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
