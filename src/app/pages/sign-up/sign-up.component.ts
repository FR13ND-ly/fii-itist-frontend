import { Component, inject, signal } from '@angular/core';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EmailComponent } from './email/email.component';
import { FormBuilder } from '@angular/forms';
import e from 'express';
import { AuthService } from '../../core/services/auth.service';
import { EmailForm } from '../../core/models/auth.model';

@Component({
    selector: 'app-sign-up',
    imports: [AdditionalInfoComponent, BaseInfoComponent, ConfirmationComponent, EmailComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
    authService = inject(AuthService);

    stage = signal(0)

    fb = new FormBuilder();

    emailData = {
        email: '',
        password: '',
        oAuth: false,
    }

    basicInfoForm = this.fb.group({
        firstName: [''],
        lastName: [''],
    })

    additionalInfoForm = this.fb.group({
        educationLevel: [''],
        educationInstitution: [''],
        educationYear: [''],
        faculty: [''],
        occupation: [''],
        experience: [''],
        heardAboutUs: [''],
    });

    handleEmail(emailForm: EmailForm) {
        this.stage.set(1);
        this.emailData.email = emailForm.email;
        this.emailData.password = emailForm.password;
        this.emailData.oAuth = emailForm.oAuth || false;
        if (emailForm.oAuth) {
            this.basicInfoForm.patchValue({
                firstName: emailForm.firstName,
                lastName: emailForm.lastName
            });
        }
    }

    handleBasicInfo() {
        this.stage.set(2);
    }

    handleAdditionalInfo() {
        let data = {
            ...this.emailData,
            ...this.basicInfoForm.value,
            ...this.additionalInfoForm.value
        };
        this.authService.signUp(data).subscribe({
            next: (response) => {
                console.log('Sign up successful', response);
                this.stage.set(3);
            },
            error: (error) => {
                console.error('Error during sign up', error);
            }
        });
    }

    previousStage(stage: number) {
        this.stage.set(stage);
    }
}
