import { AsyncPipe, isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PartnersService } from '../../../core/services/partners.service';
import { PartnerModel } from '../../../core/models/partner.model';

@Component({
    selector: 'lp-partners',
    imports: [],
    templateUrl: './partners.component.html',
    styleUrl: './partners.component.scss'
})
export class PartnersComponent implements OnInit {
    partnersService = inject(PartnersService);
    platformId = inject(PLATFORM_ID);
    partnesrs$ = this.partnersService.getPartners();
    
    finalAnimatedPartners: PartnerModel[] = [];

    ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        this.partnesrs$.subscribe((partners: PartnerModel[]) => {
            const displayPartners: PartnerModel[] = [];
            while (displayPartners.length < 15) {
                displayPartners.push(...partners);
            }
            this.finalAnimatedPartners = [...displayPartners, ...displayPartners];
        })
    }
}
