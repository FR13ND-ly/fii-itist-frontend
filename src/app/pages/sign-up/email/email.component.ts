import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../../state/user/user.actions';
import Snackbar from 'awesome-snackbar';

@Component({
    selector: 'email-stage',
    imports: [RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './email.component.html',
    styleUrl: './email.component.scss'
})
export class EmailComponent {
    @Output() next = new EventEmitter();
    userService = inject(UserService);
    authService = inject(AuthService);
    fb = new FormBuilder();
    

    emailForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        verificationCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
    });

    verificationSent = signal(false);
    verified = signal(false);

    sendVerificationEmail() {
        let email: any = this.emailForm.get('email')?.value;
        this.userService.sendVerificationEmail(email).subscribe({
            next: (response) => {
                this.verificationSent.set(true);
                this.emailForm.controls['email'].disable();
                console.log('Verification email sent successfully', response);
            }, 
            error: (err) => {
                new Snackbar(err.error?.error, {
                    iconSrc: '/error.png',
                    position: 'bottom-right'
                });
                console.error('Error sending verification email', err);
            }
        })
    }

    async signUpWithGoogle() {
        let auth:any = await this.authService.GoogleAuth();
        let data = {
            email: auth.user.email,
            password: '',
            oAuth: true,
            firstName: auth.user.displayName.split(' ')[0],
            lastName: auth.user.displayName.split(' ')[1] || '',
        }
        this.authService.authentification({ loginCredentials: data }).subscribe()
        this.nextStage(data);
    }

    nextStage(data: any) {
        this.next.emit(data);
    }

    handleSubmit() {
        if (!this.verificationSent()) {
            this.sendVerificationEmail();
        }
        else if (!this.verified()) {
            this.verifyEmail();
        }
        else {
            this.signUpWithCredentials();
        }
    }

    verifyEmail() {
        let data = {
            email: this.emailForm.get('email')?.value,
            verificationCode: this.emailForm.get('verificationCode')?.value
        }
        this.userService.verifyEmail(data).subscribe({
            next: (response) => {
                console.log('Email verified successfully', response);
                this.verified.set(true);
            },
            error: (err) => {
                new Snackbar(err.error?.error, {
                    iconSrc: '/error.png',
                    position: 'bottom-right'
                });
                console.error('Error verifying email', err);
            }
        });
    }

    signUpWithCredentials() {
        if (this.emailForm.get('password')?.value !== this.emailForm.get('confirmPassword')?.value) {
            new Snackbar('Passwords do not match', {
                iconSrc: '/error.png',
                position: 'bottom-right'
            });
            return;
        }
        let data = {
            email: this.emailForm.get('email')?.value,
            password: this.emailForm.get('password')?.value,
            oAuth: false,
        }
        this.nextStage(data);
    }
}
