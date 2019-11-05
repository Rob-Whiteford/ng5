import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-barcode-scanner-modal',
  templateUrl: './barcode-scanner-modal.component.html',
  styleUrls: ['./barcode-scanner-modal.component.scss']
})
export class BarcodeScannerModalComponent implements OnInit {


  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.RSS_14,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  @Input() id: number;
  demoForm: FormGroup;
  public scannedData: Array<{ ScannedItem: string }> = [];

  arrayItems: { title: string; }[];

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {

    this.demoForm = this.formBuilder.group({
      demoArray: this.formBuilder.array([])
    });

    this.arrayItems = [];
  }

  ngOnInit() {
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    //console.log('resultString:', resultString);
    this.addItem(resultString);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  private submitForm() {
    console.log('submitForm:', this.demoForm.value);
    this.activeModal.close(this.demoForm.value);
  }

  get demoArray() {
    return this.demoForm.get('demoArray') as FormArray;
  }

  createItem(myNumber: string) {
    return this.formBuilder.group(({
      scannedItem: myNumber,
    }));
  }

  addItem(barcodeNumber: string) {
    
    if (this.scannedData.findIndex(i => i.ScannedItem === barcodeNumber) == -1) {
      console.log("addItem", barcodeNumber);
      this.scannedData.push({ "ScannedItem": barcodeNumber });
      this.demoArray.push(this.createItem(barcodeNumber));
    }
  }

}