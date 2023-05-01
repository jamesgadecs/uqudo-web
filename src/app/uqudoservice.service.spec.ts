import { TestBed } from '@angular/core/testing';

import { UqudoserviceService } from './uqudoservice.service';

describe('UqudoserviceService', () => {
  let service: UqudoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UqudoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
