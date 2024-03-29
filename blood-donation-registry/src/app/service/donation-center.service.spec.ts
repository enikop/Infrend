import { TestBed } from '@angular/core/testing';

import { DonationCenterService } from './donation-center.service';

describe('DonationCenterService', () => {
  let service: DonationCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonationCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
