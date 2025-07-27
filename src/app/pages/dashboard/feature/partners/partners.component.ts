import { Component, inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { PartnersService } from '../../../../core/services/partners.service';
import { Store } from '@ngrx/store';
import { PartnerEditorDialogComponent } from '../../dialogs/partner-editor-dialog/partner-editor-dialog.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PartnerModel } from '../../../../core/models/partner.model';

@Component({
  selector: 'app-partners',
  imports: [AsyncPipe],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  dialog = inject(DialogService)
  partnerService = inject(PartnersService)
  store = inject(Store)

  partners$: Observable<PartnerModel[]> = this.partnerService.getPartners();

  onAddPartner(partners: PartnerModel[]) {
    let d = this.dialog.open(PartnerEditorDialogComponent);
    d.afterClosed$.subscribe((res: any) => {
      if (!res) return;
      this.partnerService.addPartner(res).subscribe(
        (newPartner: any) => {
          partners.unshift(newPartner.partner);
        },  
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onEditPartner(partners: PartnerModel[], index: number) {
    let d = this.dialog.open(PartnerEditorDialogComponent, {
      data: partners[index],
    });
    d.afterClosed$.subscribe((res: any) => {
      if (!res) return;
      this.partnerService.updatePartner(partners[index]._id!, res).subscribe(
        (updatedPartner: any) => {
          partners[index] = updatedPartner.partner;
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  onDeletePartner(partners: any, index: number) {
    this.partnerService.deletePartner(partners[index]._id).subscribe(
      () => {
        partners.splice(index, 1);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
