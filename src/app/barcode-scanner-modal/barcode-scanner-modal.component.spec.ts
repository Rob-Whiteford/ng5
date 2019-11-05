import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeScannerModalComponent } from './barcode-scanner-modal.component';

describe('BarcodeScannerModalComponent', () => {
  let component: BarcodeScannerModalComponent;
  let fixture: ComponentFixture<BarcodeScannerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeScannerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeScannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
