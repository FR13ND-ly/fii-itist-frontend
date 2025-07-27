import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    let platformId = inject(PLATFORM_ID);
  
    if (isPlatformBrowser(platformId)) {
      let authToken: string = localStorage.getItem('token') || 'unauthenticated';
      req = req.clone({
        headers: req.headers.set('Authorization', authToken),
      });
    }
    return next(req);
};
