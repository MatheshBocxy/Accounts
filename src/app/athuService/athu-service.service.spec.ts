import { TestBed } from '@angular/core/testing';

import { AthuServiceService } from './athu-service.service';

describe('AthuServiceService', () => {
  let service: AthuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
