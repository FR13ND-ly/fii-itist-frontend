import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { SpeakersService } from '../../../../core/services/speakers.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeakerEditorDialogComponent } from '../../dialogs/speaker-editor-dialog/speaker-editor-dialog.component';

@Component({
  selector: 'app-speakers',
  imports: [AsyncPipe],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.scss'
})
export class SpeakersComponent {
  dialog = inject(DialogService)
  speakersService = inject(SpeakersService)
  store = inject(Store)

  speakers$: Observable<any> = this.speakersService.getSpeakers()

  onAddSpeaker(meetings: any) {
    let d = this.dialog.open(SpeakerEditorDialogComponent);
    d.afterClosed$.subscribe((res) => {
      if (!res) return;
      this.speakersService.addSpeaker(res).subscribe(
        (res: any) => {
          meetings.unshift(res.speaker);
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onEditSpeaker(meetings: any, index: number) {
    let d = this.dialog.open(SpeakerEditorDialogComponent, {
      data: meetings[index],
    });
    d.afterClosed$.subscribe((res) => {
      if (!res) return;
      this.speakersService.updateSpeaker(meetings[index]._id, res).subscribe(
        (updatedSpeaker: any) => {
          meetings[index] = updatedSpeaker.speaker;
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onDeleteSpeaker(meetings: any, index: number) {
    this.speakersService.deleteSpeaker(meetings[index]._id).subscribe(
      () => {
        meetings.splice(index, 1);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
