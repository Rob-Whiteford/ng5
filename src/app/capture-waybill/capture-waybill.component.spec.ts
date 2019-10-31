import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureWaybillComponent } from './capture-waybill.component';

describe('CaptureWaybillComponent', () => {
  let component: CaptureWaybillComponent;
  let fixture: ComponentFixture<CaptureWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
