import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { Observable } from 'rxjs';
import tinycolor from 'tinycolor2';
import { SessionsService } from '../../../../../core/services/sessions.service';
import { SessionModel } from '../../../../../core/models/session.model';

@Component({
  selector: 'talk-attendances',
  imports: [AsyncPipe, RouterLink, NgStyle],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss'
})
export class AttendancesComponent {
  route = inject(ActivatedRoute);
  sessionsService = inject(SessionsService);

  sessions$: Observable<SessionModel[]> = this.sessionsService.getSessionsByUserAttendances(this.route.snapshot.parent?.params['id']);

  getTextColor(bgColor: string): string {
    return tinycolor(bgColor).darken(30).toHexString();
  }
}
