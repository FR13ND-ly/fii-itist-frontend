import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  usersService = inject(UserService);

  users$: Observable<any> = this.usersService.getUsers();
}
