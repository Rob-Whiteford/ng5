import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from 'src/app/form-modal/form-modal.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements AfterViewInit {

  @ViewChild(BarecodeScannerLivestreamComponent, { static: false })
  barCodeScanner: BarecodeScannerLivestreamComponent;


  public scannedData: Array<{ ScannedItem: string }> = [];
  public scannedItem: { ScannedItem: string };
  barcodeValue;

  public gridData: any[];

  constructor(private modalService: NgbModal ) {}

  ngAfterViewInit() {

  }

  openFormModal() {
    console.log('openFormModal');
    const modalRef = this.modalService.open(FormModalComponent);
    modalRef.componentInstance.id = 10; // should be the id
    
    modalRef.result.then((result) => {
      console.log('result:', result);
    }).catch((error) => {
      console.log(error);
    });
  }

  onValueChanges(scanResult) {
    this.barcodeValue = scanResult.codeResult.code;
    this.scannedItem = { "ScannedItem": this.barcodeValue };
    this.addScanItem(this.scannedItem);
  }

  startScanner() {
    this.barCodeScanner.start();
  }

  stopScanner() {
    this.barCodeScanner.stop();
  }

  addScanInput(sender) {
    this.scannedItem = { "ScannedItem": sender.target.value };
    this.addScanItem(this.scannedItem);
    sender.target.value = "";
  }

  addScanItem(dataItem: any) {
    if (this.scannedData.findIndex(i => i.ScannedItem === dataItem.ScannedItem)==-1) {
      this.scannedData.push({ "ScannedItem": dataItem.ScannedItem });
    }
    this.refreshGrid();
  }

  deleteScanItem(rowIndex: number) {
    this.scannedData.splice(rowIndex, 1);
    this.refreshGrid();
  }

  refreshGrid(): void {
    this.gridData = this.scannedData;
    this.gridData = this.gridData.slice(0, 10);
  }

}


