import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsPrintingComponent } from './options-printing.component';

describe('OptionsPrintingComponent', () => {
  let component: OptionsPrintingComponent;
  let fixture: ComponentFixture<OptionsPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
