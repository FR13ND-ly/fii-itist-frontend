import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { SpeakersService } from '../../../../core/services/speakers.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpeakerEditorDialogComponent } from '../../dialogs/speaker-editor-dialog/speaker-editor-dialog.component';
import { SpeakerModel } from '../../../../core/models/speaker.model';

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

  speakers$: Observable<SpeakerModel[]> = this.speakersService.getSpeakers()

  onAddSpeaker(speakers: SpeakerModel[]) {
    let d = this.dialog.open(SpeakerEditorDialogComponent);
    d.afterClosed$.subscribe((res: any) => {
      if (!res) return;
      this.speakersService.addSpeaker(res).subscribe(
        (res: any) => {
          speakers.unshift(res.speaker);
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onEditSpeaker(speakers: SpeakerModel[], index: number) {
    let d = this.dialog.open(SpeakerEditorDialogComponent, {
      data: speakers[index],
    });
    d.afterClosed$.subscribe((res: any) => {
      if (!res) return;
      this.speakersService.updateSpeaker(speakers[index]._id!, res).subscribe(
        (updatedSpeaker: any) => {
          speakers[index] = updatedSpeaker.speaker;
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onDeleteSpeaker(speakers: any, index: number) {
    this.speakersService.deleteSpeaker(speakers[index]._id).subscribe(
      () => {
        speakers.splice(index, 1);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
