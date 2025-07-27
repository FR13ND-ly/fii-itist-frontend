import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionsService } from '../../../../core/services/sessions.service';
import tinycolor from 'tinycolor2';
import { AsyncPipe, NgStyle } from '@angular/common';
import { Observable } from 'rxjs';
import { SessionModel } from '../../../../core/models/session.model';

@Component({
  selector: 'app-session',
  imports: [AsyncPipe, NgStyle, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  route = inject(ActivatedRoute)
  sessionsService = inject(SessionsService);

  session$: Observable<SessionModel> = this.sessionsService.getSession(this.route.snapshot.params['id']);

  getTextColor(bgColor: string): string {
    return tinycolor(bgColor).darken(30).toHexString();
  }
}
