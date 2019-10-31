import { TestBed } from '@angular/core/testing';

import { SiteListService } from './site-list.service';

describe('SiteListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteListService = TestBed.get(SiteListService);
    expect(service).toBeTruthy();
  });
});
