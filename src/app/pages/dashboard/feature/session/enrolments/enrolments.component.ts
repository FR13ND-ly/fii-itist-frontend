import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../core/models/user.model';

@Component({
  selector: 'talk-enrolments',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './enrolments.component.html',
  styleUrl: './enrolments.component.scss'
})
export class EnrolmentsComponent {
  route = inject(ActivatedRoute);

  userService = inject(UserService);

  users$: Observable<UserModel[]> = this.userService.getUsersBySessionEnrolments(this.route.snapshot.parent?.params['id']);
}
