import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    login: props<{ loginCredentials: any }>(),
    logout: emptyProps,
    loginSuccess: props<{ user: any }>(),
  },
});
