import { AsyncPipe, isPlatformBrowser, JsonPipe, NgStyle } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CanScanDirective } from '../../../core/directives/can-scan.directive';
import { Store } from '@ngrx/store';
import { userActions } from '../../../state/user/user.actions';
import { selectUser } from '../../../state/user/user.reducer';

@Component({
  selector: 'lp-header',
  imports: [AsyncPipe, RouterLink, CanScanDirective, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @Input() activeSectionId: string | null = null;
  platformId = inject(PLATFORM_ID)
  authService = inject(AuthService);
  store = inject(Store);
  user$ = this.store.select(selectUser);
  auth = this.authService.getUserData();

  marginLeft = signal(0);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let accountButton = document.getElementById('account-button') as HTMLElement;
      this.marginLeft.set(Math.trunc(accountButton.getBoundingClientRect().left - 200));
    }
  }

  onLogout() {
    this.store.dispatch(userActions.logout())
  }

   onHidePopover() {
    let popoverRef = document.getElementById('account-menu') as HTMLElement;
    if (popoverRef) {
      popoverRef.hidePopover();
    }
  }
}
