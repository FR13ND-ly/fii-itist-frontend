import { Component, inject, PLATFORM_ID } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { UserService } from '../../services/user.service';
import { SessionsService } from '../../services/sessions.service';
import { AuthService } from '../../services/auth.service';
import tinycolor from 'tinycolor2';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { SessionDetailsDialogComponent } from './session-details-dialog/session-details-dialog.component';
import { PauseDetailsDialogComponent } from './pause-details-dialog/pause-details-dialog.component';

@Component({
  selector: 'talks',
  imports: [NgStyle],
  templateUrl: './talks.component.html',
  styleUrl: './talks.component.scss'
})
export class TalksComponent {
    platformId = inject(PLATFORM_ID);
    dialog = inject(DialogService);
    agenda: any;
    userService = inject(UserService);
    sessionsService = inject(SessionsService);
    authService = inject(AuthService);

    halls:any = []

    timeSpans: any = []

    sessions: any = [];

    getTextColor(bgColor: string): string {
        return tinycolor(bgColor).darken(30).toHexString();
    }

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) return;
        this.sessionsService.getTimeSlots().subscribe((timeSpans: any) => {
            this.timeSpans = timeSpans;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
        });
        this.sessionsService.getHalls().subscribe((halls: any) => {
            this.halls = halls;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
        });
        this.sessionsService.getSessions().subscribe((sessions: any) => {
            this.sessions = sessions;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
            if (!this.authService.getUserData().id) return;
            this.userService.getEnrolments(this.authService.getUserData().id).subscribe((enrolments: any) => {
                enrolments.forEach((enrolment: any) => {
                    this.sessions.forEach((session: any) => {
                        if (session._id === enrolment.sessionId) {
                            session.enrolled = true;
                        }
                    });
                });
            });
        });
    }

    buildAgenda(timeSpans: any[], halls: any[], sessions: any[]) {
        this.agenda = timeSpans.map(time => {
            if (time.noHalls) {
                return [{
                    ...time,
                    halls: [],
                    noHalls: true
                }];
            }
            const row = [time];
            for (const hall of halls) {
                const session = sessions.find(s =>
                    s.timeSlotId === time._id && s.hallId === hall._id
                );
                if (session) {
                    session.hallName = hall.name;
                    session.startTime = time.startTime;
                    session.endTime = time.endTime;
                    session.enrolled = false
                }
                row.push(session ?? null);
            }
            return row;
        });
    }

    openSessionDetails(session: any) {
        this.dialog.open(SessionDetailsDialogComponent, {
            data: session
        });
    }

    openPauseDetails(pause: any) {
        this.dialog.open(PauseDetailsDialogComponent, {
            data: pause
        });
    }
}
