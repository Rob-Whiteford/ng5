import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManifestsComponent } from './view-manifests.component';

describe('ManifestsComponent', () => {
  let component: ViewManifestsComponent;
  let fixture: ComponentFixture<ViewManifestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewManifestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManifestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
