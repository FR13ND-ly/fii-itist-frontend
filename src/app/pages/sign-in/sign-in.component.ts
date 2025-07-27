import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { userActions } from '../../state/user/user.actions';
import { LoginCredentials } from '../../core/models/auth.model';

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
        let data: LoginCredentials = {
            email: auth.user.email!,
            password: '',
            oAuth: true,
        }
        this.signIn(data);
    }

    signIn(loginCredentials: LoginCredentials) {
        this.store.dispatch(userActions.login({ loginCredentials }));
    }



    onSubmit() {
        if (this.signInForm.invalid) {
        
        }
        const email = this.signInForm.value.email!;
        const password = this.signInForm.value.password!;
        let data: LoginCredentials = {
            email,
            password,
            oAuth: false,
        }
        this.signIn(data);
    }
}
