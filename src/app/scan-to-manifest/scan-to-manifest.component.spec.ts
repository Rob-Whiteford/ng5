import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanToManifestComponent } from './scan-to-manifest.component';

describe('ScanToManifestComponent', () => {
  let component: ScanToManifestComponent;
  let fixture: ComponentFixture<ScanToManifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanToManifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanToManifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
