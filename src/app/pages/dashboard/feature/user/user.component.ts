import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  route = inject(ActivatedRoute)
  userService = inject(UserService);

  user$: Observable<UserModel> = this.userService.getUserById(this.route.snapshot.params['id']);
}
