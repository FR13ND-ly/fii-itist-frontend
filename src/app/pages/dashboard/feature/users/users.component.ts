import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  usersService = inject(UserService);

  users$: Observable<UserModel[]> = this.usersService.getUsers();
}
