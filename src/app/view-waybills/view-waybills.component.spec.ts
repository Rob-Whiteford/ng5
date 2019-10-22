import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWaybillsComponent } from './view-waybills.component';

describe('ViewWaybillsComponent', () => {
  let component: ViewWaybillsComponent;
  let fixture: ComponentFixture<ViewWaybillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWaybillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
