import { Component, inject } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../../../../core/models/user.model';

@Component({
  selector: 'talk-details',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  userService = inject(UserService);
  route = inject(ActivatedRoute)

  user$: Observable<UserModel> = this.userService.getUserById(this.route.snapshot.params['id']).pipe(
    tap((user: UserModel) => {
      if (user.canScan === undefined) {
        this.canScanForm.patchValue({ canScan: false });
      } else {
        this.canScanForm.patchValue({ canScan: user.canScan });
      }
    }
  ));

  fb = new FormBuilder();

  canScanForm = this.fb.group({
    canScan: [false]
  });


  onSubmit(user: UserModel) {
    let data = {
      ...user,
      canScan: this.canScanForm.value.canScan
    }

    this.userService.updateUser(user._id!, data).subscribe({
      next: () => {
        console.log('User updated successfully');
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }
    
}
