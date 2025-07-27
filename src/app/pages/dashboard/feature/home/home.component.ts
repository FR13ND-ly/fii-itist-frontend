import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AsyncPipe, isPlatformBrowser, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { QrCodeDialogComponent } from '../../dialogs/qr-code-dialog/qr-code-dialog.component';
import { TalksComponent } from '../../../../core/components/talks/talks.component';
import { QrCodeComponent } from 'ng-qrcode';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-home',
  imports: [QrCodeComponent, AsyncPipe, TalksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userService = inject(UserService);
  authService = inject(AuthService);
  dialog = inject(DialogService)
  platformId = inject(PLATFORM_ID);

  get auth() {
    return this.authService.getUserData();
  }

  user$!: Observable<UserModel>

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.user$ = this.userService.getUserById(this.auth.id);
  }

  openQrDialog(code: any) {
    this.dialog.open(QrCodeDialogComponent, {
      data: code
    });
  }
}
