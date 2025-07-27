import { Directive, inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthModel } from '../models/auth.model';

@Directive({
  selector: '[canScan]'
})
export class CanScanDirective {

  private authService = inject(AuthService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    const user: AuthModel = this.authService.getUserData();
    if (user.canScan) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
