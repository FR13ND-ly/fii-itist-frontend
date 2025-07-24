import { Component, inject } from '@angular/core';
import { QrComponent } from '../../ui/qr-code/qr-code.component';
import { UserService } from '../../../../core/services/user.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { QrCodeDialogComponent } from '../../dialogs/qr-code-dialog/qr-code-dialog.component';
import { HomeAgendaComponent } from '../../ui/home-agenda/home-agenda.component';

@Component({
  selector: 'app-home',
  imports: [QrComponent, HomeAgendaComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userService = inject(UserService);
  authService = inject(AuthService);
  dialog = inject(DialogService)

  get auth() {
    return this.authService.getUserData();
  }

  user$: Observable<any> = this.userService.getUserById(this.auth.id);


  openQrDialog(code: any) {
    this.dialog.open(QrCodeDialogComponent, {
      data: code
    });
  }
}
