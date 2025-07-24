import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user/user.actions';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    authService = inject(AuthService)
    store = inject(Store)

    fb = new FormBuilder();

    signInForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });


    async signInWithGoogle() {
        let auth = await this.authService.GoogleAuth();
        let data = {
            email: auth.user.email,
            password: '',
            oAuth: true,
        }
        this.signIn(data);
    }

    signIn(loginCredentials: any) {
        this.store.dispatch(userActions.login({ loginCredentials }));
    }



    onSubmit() {
        if (this.signInForm.invalid) {
        
        }
        let data = {
            ...this.signInForm.value,
            oAuth: false,
        }
        this.signIn(data);
    }
}
