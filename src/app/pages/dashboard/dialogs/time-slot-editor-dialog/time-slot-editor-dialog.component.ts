import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-time-slot-editor-dialog',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './time-slot-editor-dialog.component.html'
})
export class TimeSlotEditorDialogComponent {
  private ref = inject(DialogRef);
  timeSlot: any = this.ref.data;
  fb = new FormBuilder();

  timeSlotForm: FormGroup = this.fb.group({
    startTime: ['', [Validators.required, this.timeValidator]], 
    endTime: ['', [Validators.required, this.timeValidator]],
    noHalls: [false, Validators.required],
    details: this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
    })
  });

  private timeValidator(control: any) {
    const value = control.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regex.test(value)) {
      return { invalidTime: true };
    }
    return null;
  }
  private toTimeOnly(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const d = new Date(0);
    d.setUTCHours(hours);
    d.setUTCMinutes(minutes);
    return d;
  }

  ngOnInit() {
    if (!this.timeSlot) return;
    this.timeSlotForm.setValue({
      startTime: this.toTimeOnly(this.timeSlot.startTime).toISOString().substring(11, 16),
      endTime: this.toTimeOnly(this.timeSlot.endTime).toISOString().substring(11, 16),
      noHalls: this.timeSlot.noHalls || false,
      details: {
        title: this.timeSlot.details?.title || '',
        location: this.timeSlot.details?.location || ''
      }
    });
  }

  onSubmit() {
    const formValue = this.timeSlotForm.value;
    const startTime = this.toTimeOnly(formValue.startTime);
    const endTime = this.toTimeOnly(formValue.endTime);
    
    let res = {
      action: this.timeSlot?._id ? 'update' : 'create',
      data: {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        noHalls: formValue.noHalls,
        details: formValue.details
      }
    }
    this.ref.close(res);
    this.timeSlotForm.reset();    
  }

  onDelete() {
    this.ref.close({ action: 'delete' });
    this.timeSlotForm.reset();
  }
}
