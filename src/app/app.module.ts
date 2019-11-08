import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HelpComponent } from './help/help.component';
import { ViewWaybillsComponent } from './view-waybills/view-waybills.component';
import { CaptureWaybillComponent } from './capture-waybill/capture-waybill.component';
import { ViewManifestsComponent } from './view-manifests/view-manifests.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridModule } from '@progress/kendo-angular-grid';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ScanBarcodeComponent } from './scan-barcode/scan-barcode.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormatsDialogComponent } from './scan-barcode/formats-dialog/formats-dialog.component';
import { AppInfoDialogComponent } from './scan-barcode/app-info-dialog/app-info-dialog.component';
import { MatMenuModule, MatDialogModule } from '@angular/material';
import { DemoComponent } from './demo/demo.component';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { FormModalComponent } from './form-modal/form-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodeScannerModalComponent } from './barcode-scanner-modal/barcode-scanner-modal.component';
import { ViewSitesComponent } from './view-sites/view-sites.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HelpComponent,
    ViewWaybillsComponent,
    CaptureWaybillComponent,
    ViewManifestsComponent,
    FetchDataComponent,
    ScanBarcodeComponent,
    FormatsDialogComponent,
    AppInfoDialogComponent,
    DemoComponent,
    FormModalComponent,
    BarcodeScannerModalComponent,
    ViewSitesComponent,
    EditSiteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    GridModule,
    ToolBarModule,
    DateInputsModule,
    DropDownsModule,
    ZXingScannerModule,
    MatMenuModule,
    MatDialogModule,
    BarecodeScannerLivestreamModule,
    NgbModule,
    ReactiveFormsModule,
    DialogsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [FormatsDialogComponent, AppInfoDialogComponent, FormModalComponent, BarcodeScannerModalComponent],
})
export class AppModule { }
