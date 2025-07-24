import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { InMemoryScrollingFeature, InMemoryScrollingOptions, provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { userFeature } from './state/user/user.reducer';
import { loadingFeature } from './state/loading/loading.reduce';
import { provideEffects } from '@ngrx/effects';
import { effects } from './state/app.effects';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'ro' },
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, inMemoryScrollingFeature), 
    provideStore(),
    provideState(userFeature),
    provideState(loadingFeature),
    provideEffects(effects),
    provideClientHydration(), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])), 
    provideFirebaseApp(() => initializeApp({ projectId: "fii-itist", appId: "1:309902315859:web:54fabd4e1025394ff051a6", storageBucket: "fii-itist.firebasestorage.app", apiKey: "AIzaSyA3sCq9aCFaIpDhx8eydTYX6OeEowilIx0", authDomain: "fii-itist.firebaseapp.com", messagingSenderId: "309902315859" })), 
    provideAuth(() => getAuth()),
  ]
};
