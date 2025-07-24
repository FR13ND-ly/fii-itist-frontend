import { Component, inject, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import tinycolor from 'tinycolor2';
import { UserService } from '../../../../core/services/user.service';
import { NgStyle } from '@angular/common';
import { SessionsService } from '../../../../core/services/sessions.service';
import { TimeSlotEditorDialogComponent } from '../../dialogs/time-slot-editor-dialog/time-slot-editor-dialog.component';
import { HallEditorDialogComponent } from '../../dialogs/hall-editor-dialog/hall-editor-dialog.component';
import { SessionEditorDialogComponent } from '../../dialogs/session-editor-dialog/session-editor-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sessions',
  imports: [NgStyle],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent implements OnInit {
    dialog = inject(DialogService);
    agenda: any;
    userService = inject(UserService);
    sessionsService = inject(SessionsService);
    authService = inject(AuthService);

    halls: any = [];

    timeSlots: any = []

    sessions: any = [];


    getTextColor(bgColor: string): string {
        return tinycolor(bgColor).darken(30).toHexString();
    }

    ngOnInit() {
      this.sessionsService.getTimeSlots().subscribe((timeSlots: any) => {
        this.timeSlots = timeSlots;
        this.buildAgenda(this.timeSlots, this.halls, this.sessions);
      });

      this.sessionsService.getHalls().subscribe((halls: any) => {
        this.halls = halls;
        this.buildAgenda(this.timeSlots, this.halls, this.sessions);
      });

      this.sessionsService.getSessions().subscribe((sessions: any) => {
        this.sessions = sessions;
        this.buildAgenda(this.timeSlots, this.halls, this.sessions);
      });
    }

    buildAgenda(timeSlots: any[], halls: any[], sessions: any[]) {
        this.agenda = timeSlots.map(time => {
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
                  console.log(session);
                    session.hallName = hall.name;
                    session.startTime = time.startTime;
                    session.endTime = time.endTime;
                    session.enrolled = true
                }
                row.push(session ?? null);
            }
            return row;
        });
    }

    onAddHall() {
      let d = this.dialog.open(HallEditorDialogComponent);
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        this.sessionsService.addHall(res.data).subscribe(
          (newHall: any) => {
              this.halls.push(newHall.hall);
              this.buildAgenda(this.timeSlots, this.halls, this.sessions);
          }
        );
      });
    }

    onEditHall(hall: any) {
      let d = this.dialog.open(HallEditorDialogComponent, {
        data: hall,
      });
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        if (res.action === 'delete') {
          this.sessionsService.deleteHall(hall._id).subscribe(
            () => {
              this.sessionsService.getHalls().subscribe(
                (halls: any) => {
                  this.halls = halls;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
              },
              (err) => {
                console.error(err);
              }
              );
            }
          );
          return;
        }
        else if (res.action === 'update') {
          this.sessionsService.updateHall(hall._id, res.data).subscribe(
            (updatedHall: any) => {
              this.sessionsService.getHalls().subscribe(
                (halls: any) => {
                  this.halls = halls;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
                }
              )
            },
            (err) => {
              console.error(err);
            }
          );
        }
      });
    }

    onAddTimeSlot() {
      let d = this.dialog.open(TimeSlotEditorDialogComponent);
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        this.sessionsService.addTimeSlot(res.data).subscribe(
          (newTimeSlot: any) => {
              this.timeSlots.push(newTimeSlot.timeSlot);
              this.buildAgenda(this.timeSlots, this.halls, this.sessions);
          }
        );
      });
    }

    onEditTimeSlot(timeSlot: any) {
      let d = this.dialog.open(TimeSlotEditorDialogComponent, {
        data: timeSlot,
      });
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        if (res.action === 'delete') {
          this.sessionsService.deleteTimeSlot(timeSlot._id).subscribe(
            () => {
              this.sessionsService.getTimeSlots().subscribe(
                (timeSlots: any) => {
                  this.timeSlots = timeSlots;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
              },
              (err) => {
                console.error(err);
              }
              );
            }
          );
          return;
        }
        else if (res.action === 'update') {
          this.sessionsService.updateTimeSlot(timeSlot._id, res.data).subscribe(
            (updatedTimeSlot: any) => {
              timeSlot = updatedTimeSlot.timeSlot;
              this.sessionsService.getTimeSlots().subscribe(
                (timeSlots: any) => {
                  this.timeSlots = timeSlots;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
                })
            },
            (err) => {
              console.error(err);
            }
          );
        }
        }
      );
    }


    onAddSession(hallId: string, timeSlotId: string) {
      let d = this.dialog.open(SessionEditorDialogComponent, {
        data: {
          hallId: hallId,
          timeSlotId: timeSlotId
        }
      });
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        this.sessionsService.addSession(res.data).subscribe(
          (newSession: any) => {
              this.sessions.push(newSession.session);
              this.sessionsService.getSessions().subscribe(
                (sessions: any) => {
                  this.sessions = sessions;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
                },
                (err) => {
                  console.error(err);
                }
              );
          }
        );
      });
    }

    onEditSession(session: any) {
      let d = this.dialog.open(SessionEditorDialogComponent, {
        data: session,
      });
      d.afterClosed$.subscribe((res: any) => {
        if (!res) return;
        if (res.action === 'delete') {
          this.sessionsService.deleteSession(session._id).subscribe(
            () => {
              this.sessionsService.getSessions().subscribe(
                (sessions: any) => {
                  this.sessions = sessions;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
              },
              (err) => {
                console.error(err);
              }
              );
            }
          );
          return;
        }
        else if (res.action === 'update') {
          this.sessionsService.updateSession(session._id, res.data).subscribe(
            (updatedSession: any) => {
              this.sessionsService.getSessions().subscribe(
                (sessions: any) => {
                  this.sessions = sessions;
                  this.buildAgenda(this.timeSlots, this.halls, this.sessions);
                }
              )
            },
            (err) => {
              console.error(err);
            }
          );
        }
      });
    }
}
