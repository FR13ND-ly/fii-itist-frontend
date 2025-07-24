import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userActions } from './user.actions';
import { catchError, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoading } from '../loading/loading.actions';
import { AuthService } from '../../core/services/auth.service';
import Snackbar from 'awesome-snackbar';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store)

  login$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(userActions.login),
      switchMap((data: any): any => {
        return this.authService
          .authentification(data)
          .pipe(map((user: any) => {
            userActions.loginSuccess(user)
        }),
        catchError((err: any): any => {
          new Snackbar(err.error?.error, {
            iconSrc: '/error.png',
            position: 'bottom-right'
          });
        })
      );
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    (): any =>
      this.actions$.pipe(
        ofType(userActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}
