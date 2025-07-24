import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canScanGuard } from './can-scan.guard';

describe('canScanGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canScanGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
