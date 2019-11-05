import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {

  @ViewChild(BarecodeScannerLivestreamComponent, { static: false })
  barCodeScanner: BarecodeScannerLivestreamComponent;

  public scannedData: Array<{ ScannedItem: string }> = [];
  public scannedItem: { ScannedItem: string };
  barcodeValue;
  items: FormArray;

  arrayItems: {
    title: string;
  }[];
  
  @Input() id: number;
  demoForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

    this.demoForm = this.formBuilder.group({
      demoArray: this.formBuilder.array([])
    });

  }

  ngOnInit() {




    this.arrayItems = [];

  }

  get demoArray() {
    return this.demoForm.get('demoArray') as FormArray;
  }

  createItem(myNumber: string) {
    return this.formBuilder.group(({
      scannedItem: myNumber,
    }));
  }

  addItem(item) {
    this.arrayItems.push(item);
    this.demoArray.push(this.createItem(item));
  }

  removeItem() {
    this.arrayItems.pop();
    this.demoArray.removeAt(this.demoArray.length - 1);
  }

  ngAfterViewInit() {
    this.startScanner()
  }

  ngOnDestroy() {
    this.stopScanner()
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  private submitForm() {
    
    console.log('submitForm:', this.demoForm.value);
    
    this.activeModal.close(this.demoForm.value);
  }

  startScanner() {
    this.barCodeScanner.start();
  }

  stopScanner() {
    this.barCodeScanner.stop();
  }

  onValueChanges(scanResult) {
    this.barcodeValue = scanResult.codeResult.code;
    this.scannedItem = { "ScannedItem": this.barcodeValue };
    this.addItem(this.barcodeValue);
  }

  addScanItem(dataItem: any) {

    //if (this.scannedData.findIndex(i => i.ScannedItem === dataItem.ScannedItem)==-1) {
    this.scannedData.push({ "ScannedItem": dataItem.ScannedItem });
    console.log("ScannedItem:", dataItem.ScannedItem);
  }

}