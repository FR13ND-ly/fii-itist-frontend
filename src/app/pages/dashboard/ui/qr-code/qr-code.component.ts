import { Component, inject, Input } from '@angular/core';
import { QrCodeComponent } from 'ng-qrcode';

@Component({
  selector: 'qr',
  imports: [QrCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss'
})
export class QrComponent {
  @Input() code: any
}
