import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthModel } from '../models/auth.model';

@Directive({
  selector: '[noUser]'
})
export class NoUserDirective {

  private authService = inject(AuthService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    const user: AuthModel = this.authService.getUserData();
    if (user.email) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
