import { TestBed } from '@angular/core/testing';

import { MpServiceService } from './mp-service.service';

describe('MpServiceService', () => {
  let service: MpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
