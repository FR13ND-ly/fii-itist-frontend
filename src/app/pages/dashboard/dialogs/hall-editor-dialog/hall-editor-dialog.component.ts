import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-hall-editor-dialog',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './hall-editor-dialog.component.html',
  styleUrl: './hall-editor-dialog.component.scss'
})
export class HallEditorDialogComponent implements OnInit {
  private ref = inject(DialogRef);
  hall: any = this.ref.data;
  fb = new FormBuilder();

  hallForm = this.fb.group({
    name: ['', Validators.required],
    location: ['', Validators.required]
  });

  ngOnInit(): void {
    if (!this.hall?._id) return;
    this.hallForm.setValue({
      name: this.hall.name ?? '',
      location: this.hall.location ?? ''
    });
  }

  handleSubmit(): void {
    if (this.hallForm.invalid) {
      return;
    }
    let res = {
      action: this.hall?._id ? 'update' : 'create',
      data: this.hallForm.value,
    }
    this.ref.close(res);
    this.hallForm.reset();
  }

  onDelete(): void {
    this.ref.close({ action: 'delete' });
    this.hallForm.reset();
  }
}
