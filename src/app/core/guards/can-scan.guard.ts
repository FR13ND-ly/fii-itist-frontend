import { CanActivateFn } from '@angular/router';

export const canScanGuard: CanActivateFn = (route, state) => {
  return true;
};
