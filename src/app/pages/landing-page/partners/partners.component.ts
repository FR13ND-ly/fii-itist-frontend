import { AsyncPipe, isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PartnersService } from '../../../core/services/partners.service';

@Component({
    selector: 'lp-partners',
    imports: [NgTemplateOutlet],
    templateUrl: './partners.component.html',
    styleUrl: './partners.component.scss'
})
export class PartnersComponent implements OnInit {
    partnersService = inject(PartnersService);
    platformId = inject(PLATFORM_ID);
    partnesrs$ = this.partnersService.getPartners();
    
    private partners: any[] = [
        { imageUrl: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', name: 'Google', type: 'Platinum', url: 'https://www.google.com' },
        { imageUrl: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', name: 'Microsoft', type: 'Gold', url: 'https://www.microsoft.com' },
        { imageUrl: 'https://cdn.worldvectorlogo.com/logos/apple-14.svg', name: 'Apple', type: 'Silver', url: 'https://www.apple.com' },
        { imageUrl: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', name: 'Amazon', type: 'Bronze', url: 'https://www.amazon.com' },
        { imageUrl: 'https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj', name: 'Meta', type: 'Community', url: 'https://www.meta.com' },
    ];
    
    finalAnimatedPartners: any[] = [];

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) return;
        this.partnesrs$.subscribe((partners: any) => {
            const displayPartners: any[] = [];
            while (displayPartners.length < 15) {
                displayPartners.push(...partners);
            }
            this.finalAnimatedPartners = [...displayPartners, ...displayPartners];
        })
    }
}
