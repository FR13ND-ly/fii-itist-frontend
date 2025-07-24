import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next): any => {
    let platformId = inject(PLATFORM_ID);
  
    if (isPlatformBrowser(platformId)) {
      let authToken: any = localStorage.getItem('token') || 'unauthenticated';
      req = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
    }
    else {
      console.log('[BUILD-TIME HTTP] Attempted HTTP call:', req.url);
      return of();
    }
    return next(req);
};
