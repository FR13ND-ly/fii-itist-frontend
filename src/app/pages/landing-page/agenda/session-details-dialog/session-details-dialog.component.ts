import { JsonPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import tinycolor from 'tinycolor2';
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-details-dialog',
  imports: [NgStyle, RouterLink],
  templateUrl: './session-details-dialog.component.html',
  styleUrl: './session-details-dialog.component.scss'
})
export class SessionDetailsDialogComponent {
  private ref = inject(DialogRef);
  session: any = this.ref.data;
  authService = inject(AuthService);
  usersService = inject(UserService);

  auth = this.authService.getUserData();

  getTextColor(bgColor: string): string {
    return tinycolor(bgColor).darken(30).toHexString();
  }

  onEnroll() {
    const userId = this.authService.getUserData().id;
    const sessionId = this.session._id;
    this.usersService.addEnrolment(userId, sessionId).subscribe(
      (res: any) => {
        this.session.enrolled = true;
      }, 
      (err: any) => {
        console.error('Enrollment failed:', err);
      }
    );
  }

  onUnenroll() {
    const userId = this.authService.getUserData().id;
    const sessionId = this.session._id;
    this.usersService.removeEnrolment(userId, sessionId).subscribe(
      (res: any) => {
        this.session.enrolled = false;
      }, 
      (err: any) => {
        console.error('Unenrollment failed:', err);
      }
    );
  }
}
