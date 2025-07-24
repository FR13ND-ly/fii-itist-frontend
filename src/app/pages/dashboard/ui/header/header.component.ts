import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CanScanDirective } from '../../../../core/directives/can-scan.directive';
import { Store } from '@ngrx/store';
import { userActions } from '../../../../state/user/user.actions';

@Component({
  selector: 'dasboard-header',
  imports: [AsyncPipe, RouterLink, CanScanDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  store = inject(Store);


  logout() {
    this.store.dispatch(userActions.logout())
  }
}
