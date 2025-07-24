import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-partner-editor-dialog',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './partner-editor-dialog.component.html',
  styleUrl: './partner-editor-dialog.component.scss'
})
export class PartnerEditorDialogComponent implements OnInit {
  private ref = inject(DialogRef);
  partner: any = this.ref.data;
  fb = new FormBuilder();

  partnerForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    imageUrl: ['', Validators.required],
    url: ['', Validators.required],
  });

  ngOnInit() {
    if (!this.partner?._id) return;
    this.partnerForm.setValue({
      name: this.partner.name ?? '',
      type: this.partner.type ?? '',
      imageUrl: this.partner.imageUrl ?? '',
      url: this.partner.url ?? '',
    });
  }

  handleSubmit() {
    if (this.partnerForm.invalid) {
      return;
    }
    this.ref.close({ ...this.partnerForm.value, _id: this.partner?._id });
    this.partnerForm.reset();
  }
}
