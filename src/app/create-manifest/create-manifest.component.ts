import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WaybillListService } from '../services/waybill-list.service';
import { Waybill } from '../models/waybill.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GridDataResult, GridModule } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

import { ScannedItem } from '../models/scanneditem.model';
import { ScanToManifestComponent } from '../scan-to-manifest/scan-to-manifest.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BarcodeScannerModalComponent } from '../barcode-scanner-modal/barcode-scanner-modal.component';

@Component({
  selector: 'app-create-manifest',
  templateUrl: './create-manifest.component.html',
  styleUrls: ['./create-manifest.component.scss']
})

@NgModule({
  declarations: [
    ScanToManifestComponent
  ],
  imports: [
    ReactiveFormsModule,
    GridModule,
    DialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CreateManifestComponent implements OnInit {

  waybills: Waybill[];
  isLoaded = false;
  public pageSize = 10;
  public skip = 0

  public gridData: any[];

  public view: Observable<GridDataResult>;
  public state: State = {
    skip: 0,
    take: 5
  };

  public newScanData: ScannedItem;
  public isNew: boolean;
  public DefaultManifestDate: Date = new Date();

  constructor(private _callService: WaybillListService, private http: HttpClient, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getWaybills();
  }

  openFormModal() {
    console.log('openFormModal');
    const modalRef = this.modalService.open(BarcodeScannerModalComponent);
    modalRef.componentInstance.id = 10; // should be the id
    modalRef.result.then((result) => {
      console.log('result:', result);
    }).catch((error) => {
      console.log(error);
    });
  }

  getWaybills(): void {
    this._callService.getWaybillList().subscribe(data => {
      if (data) {
        this.waybills  = data.Waybill;
        this.isLoaded = true;
        this.gridData = this.waybills;
      }
    })
  };

  public addHandler() {
    console.log('addHandler:newScanData');
    this.newScanData = new ScannedItem();
    this.isNew = true;
  }

  public saveHandler(data: ScannedItem) {
    //this._callService.saveSite(site, this.isNew);
    this.newScanData = undefined;
  }

  public cancelHandler() {
    this.newScanData = undefined;
  }
}
