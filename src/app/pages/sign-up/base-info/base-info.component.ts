import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'base-info-stage',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './base-info.component.html',
    styleUrl: './base-info.component.scss'
})
export class BaseInfoComponent {
    @Input() baseInfoForm: any;
    @Output() next = new EventEmitter();
    @Output() previous = new EventEmitter();

    handleSubmit() {
        if (this.baseInfoForm.valid) {
            this.next.emit(this.baseInfoForm.value);
        } else {
            console.error('Form is invalid');
        }
    }

    previousStage() {
        this.previous.emit();
    }
}
