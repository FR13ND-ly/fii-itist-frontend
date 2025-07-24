import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-speaker-editor-dialog',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './speaker-editor-dialog.component.html',
  styleUrl: './speaker-editor-dialog.component.scss'
})
export class SpeakerEditorDialogComponent implements OnInit {
  private ref = inject(DialogRef);
  speaker: any = this.ref.data;
  fb = new FormBuilder();
  
  speakerForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: ['', Validators.required],
    linkedInUrl: ['', Validators.required],
  })

  ngOnInit(): void {
    if (!this.speaker?._id) return
    this.speakerForm.setValue({
      name: this.speaker.name ?? '',
      description: this.speaker.description ?? '',
      imageUrl: this.speaker.imageUrl ?? '',
      linkedInUrl: this.speaker.linkedInUrl ?? '',
    })
  }

  handleSubmit() {
    if (this.speakerForm.invalid) {
      return
    }
    this.ref.close({...this.speakerForm.value, _id: this.speaker?._id})
    this.speakerForm.reset()
  }
}
