import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next): any => {
    let platformId = inject(PLATFORM_ID);
  
    if (isPlatformBrowser(platformId)) {
      let authToken: any = localStorage.getItem('token') || 'unauthenticated';
      req = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
    }
    return next(req);
};
