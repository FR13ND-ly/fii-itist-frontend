import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SessionsService } from '../../../../../core/services/sessions.service';
import { UserService } from '../../../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../core/models/user.model';

@Component({
  selector: 'talk-attendances',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss'
})
export class AttendancesComponent {
  route = inject(ActivatedRoute);

  userService = inject(UserService);

  users$: Observable<UserModel[]> = this.userService.getUsersBySessionAttendances(this.route.snapshot.parent?.params['id']);
}
