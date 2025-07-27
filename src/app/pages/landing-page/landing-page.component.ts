import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { AgendaComponent } from './agenda/agenda.component';
import { AreasComponent } from './areas/areas.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeroComponent } from './hero/hero.component';
import { PartnersComponent } from './partners/partners.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { DemoComponent } from './demo/demo.component';
import { HeaderComponent } from './header/header.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-landing-page',
    imports: [AboutComponent, AgendaComponent, AreasComponent, DemoComponent, GalleryComponent, HeaderComponent, HeroComponent, PartnersComponent, SpeakersComponent],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
    platformId = inject(PLATFORM_ID);
    activeSectionId: string | null = null;

    @ViewChildren('section', { read: ElementRef }) private sectionElements!: QueryList<ElementRef>;

    private observer!: IntersectionObserver;

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        const options = {
            root: null,
            threshold: 0.2
        };
        this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.activeSectionId = entry.target.getAttribute('data-section-id');
            }
        });
        }, options);

        this.sectionElements.forEach(el => this.observer.observe(el.nativeElement));
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

}
