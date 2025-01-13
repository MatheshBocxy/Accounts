import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { athuGuardGuard } from './athu-guard.guard';

describe('athuGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => athuGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
