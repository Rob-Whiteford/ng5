import { TestBed } from '@angular/core/testing';

import { WaybillListService } from './waybill-list.service';

describe('WaybillListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaybillListService = TestBed.get(WaybillListService);
    expect(service).toBeTruthy();
  });
});
