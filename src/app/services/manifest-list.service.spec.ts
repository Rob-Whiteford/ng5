import { TestBed } from '@angular/core/testing';

import { ManifestListService } from './manifest-list.service';

describe('ManifestListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManifestListService = TestBed.get(ManifestListService);
    expect(service).toBeTruthy();
  });
});
