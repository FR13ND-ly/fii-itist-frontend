import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { QrCodeComponent } from 'ng-qrcode';

@Component({
  selector: 'app-qr-code-dialog',
  imports: [QrCodeComponent],
  templateUrl: './qr-code-dialog.component.html',
  styleUrl: './qr-code-dialog.component.scss'
})
export class QrCodeDialogComponent {
  ref = inject(DialogRef);
  code = this.ref.data;
}
