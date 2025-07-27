import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, signal, ViewChild } from '@angular/core';
import { ScannerService } from '../../core/services/scanner.service';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { AsyncPipe, isPlatformBrowser, NgClass } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SessionsService } from '../../core/services/sessions.service';
import { SessionModel } from '../../core/models/session.model';

@Component({
    selector: 'app-scanner',
    imports: [HeaderComponent, NgClass, AsyncPipe],
    templateUrl: './scanner.component.html',
    styleUrl: './scanner.component.scss'
})
export class ScannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('qrReader', { static: false }) qrReader!: ElementRef;
  scannerService = inject(ScannerService);
  sessionsService = inject(SessionsService);
  platformId = inject(PLATFORM_ID);

  sessions$: Observable<SessionModel[]> = this.sessionsService.getSessions();

  html5QrCode: Html5Qrcode | null = null;
  currentCameraId = '';
  
  lastResult = signal('');
  scanStatus = signal<'success' | 'error'>('success');
  selectedTalkId = signal<string | null>(null);

  onSelectTalk(talkId: string): void {
    this.selectedTalkId.set(talkId);
  }

  cameras = signal<Array<{ id: string; label: string }>>([]);
  isScanning = new BehaviorSubject<boolean>(false);

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return
    await this.initScanner();
    this.startScanner();
  }

  async initScanner(): Promise<void> {
    try {
      this.html5QrCode = new Html5Qrcode('qr-reader');
      const devices = await Html5Qrcode.getCameras();
      if (devices.length) {
        this.cameras.set(devices);
        this.currentCameraId = devices[0].id;
      }
    } catch (err) {
      console.error('Error initializing QR scanner:', err);
    }
  }
  
  startScanner(): void {
    if (!this.html5QrCode || !this.currentCameraId) {
      console.error('Scanner not initialized or no camera available');
      return;
    }
    
    this.html5QrCode.start(
      this.currentCameraId,
      { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0, disableFlip: false },
      this.onScanSuccess.bind(this),
      error => {}
    ).catch(err => console.error('Failed to start scanner:', err));
    this.isScanning.next(true);
  }
  
  onCameraChange(event: Event): void {
    const selectedCameraId = (event.target as HTMLSelectElement).value;
    if (this.currentCameraId !== selectedCameraId) {
      this.currentCameraId = selectedCameraId;
      if (this.html5QrCode) {
        this.html5QrCode.stop().then(() => this.startScanner());
      }
    }
  }

  onScanSuccess(decodedText: string): void {
    if (!this.isScanning.value) return;
  
    this.isScanning.next(false);
    this.lastResult.set(decodedText);
    this.playBeepSound();
    let data = {
        userId: decodedText,
        sessionId: this.selectedTalkId()
    }
    timer(5000).subscribe(() => this.isScanning.next(true));
    this.scannerService.resolveCode(data).subscribe(
      (res: any) => {
        this.lastResult.set(res.message);
        this.scanStatus.set('success');
      },
      (error: any) => {
        this.lastResult.set(error.error.error);
        this.scanStatus.set('error');
      }
    );
  
  }

  clearResult(): void {
    this.lastResult.set('');
  }

  private playBeepSound(): void {
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 1800;
    gainNode.gain.value = 0.3;
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.html5QrCode?.stop().catch(error => console.error('Error stopping scanner:', error));
  }

}
