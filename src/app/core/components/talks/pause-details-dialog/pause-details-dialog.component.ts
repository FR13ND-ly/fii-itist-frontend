import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-pause-details-dialog',
  imports: [],
  templateUrl: './pause-details-dialog.component.html',
  styleUrl: './pause-details-dialog.component.scss'
})
export class PauseDetailsDialogComponent {
  private ref = inject(DialogRef);
  pause: any = this.ref.data;
}
