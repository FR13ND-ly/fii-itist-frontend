import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgStyle } from '@angular/common';
import tinycolor from 'tinycolor2';
import { SessionsService } from '../../../../../core/services/sessions.service';
import { SessionModel } from '../../../../../core/models/session.model';

@Component({
  selector: 'talk-enrolments',
  imports: [AsyncPipe, RouterLink, NgStyle],
  templateUrl: './enrolments.component.html',
  styleUrl: './enrolments.component.scss'
})
export class EnrolmentsComponent {
  route = inject(ActivatedRoute);
  sessionsService = inject(SessionsService);

  sessions$: Observable<SessionModel[]> = this.sessionsService.getSessionsByUserEnrolments(this.route.snapshot.parent?.params['id']);

  getTextColor(bgColor: string): string {
      return tinycolor(bgColor).darken(30).toHexString();
    }
}
