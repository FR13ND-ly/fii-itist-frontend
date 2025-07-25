import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpeakersService } from '../../../../core/services/speakers.service';
import { DialogRef } from '@ngneat/dialog';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-session-editor-dialog',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './session-editor-dialog.component.html',
  styleUrl: './session-editor-dialog.component.scss'
})
export class SessionEditorDialogComponent implements OnInit {
  speakersService = inject(SpeakersService);
  private ref = inject(DialogRef);
  session: any = this.ref.data;
  
  fb = new FormBuilder();

  speakers$ = this.speakersService.getSpeakers();
  speakers: any = []
  selectedSpeakers: any = [];

  sessionForm = this.fb.group({
    type: ['', Validators.required],
    typeColor: ['#3b82f6', Validators.required], 
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.speakers$.subscribe((speakers: any) => {
      this.speakers = speakers;
    });
    if (!this.session?._id) return;
    this.selectedSpeakers = this.session.speakers.map((s: any) => s._id);
    this.sessionForm.patchValue({
      type: this.session.type ?? '',
      typeColor: this.session.typeColor ?? '#3b82f6',
      title: this.session.title ?? '',
      description: this.session.description
    });
  }

  onSpeakerChange(speakerId: any): void {
    if (this.selectedSpeakers.includes(speakerId)) {
      this.selectedSpeakers = this.selectedSpeakers.filter((id: string) => id !== speakerId);
    } else {
      this.selectedSpeakers.push(speakerId);
    }
  }

  isSpeakerSelected(speakerId: string): boolean {
    return this.selectedSpeakers.includes(speakerId);
  }

  onSubmit(): void {
    if (this.sessionForm.invalid) {
      return;
    }
    let res = {
      action: this.session?._id ? 'update' : 'create',
      data: {
        ...this.sessionForm.value,
        hallId: this.session?.hallId,
        timeSlotId: this.session?.timeSlotId,
        speakers: this.selectedSpeakers
      },
    }
    this.ref.close(res);
    this.sessionForm.reset();
  }

  onDelete(): void {
    this.ref.close({ action: 'delete' });
    this.sessionForm.reset();
  }
}
