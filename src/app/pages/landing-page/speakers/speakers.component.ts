import { Component, computed, effect, inject, OnDestroy, OnInit, PLATFORM_ID, signal, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { interval, map, merge, Observable, Subject, Subscription } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SpeakersService } from '../../../core/services/speakers.service';
import { SessionModel } from '../../../core/models/session.model';
import { SpeakerModel } from '../../../core/models/speaker.model';

@Component({
    selector: 'lp-speakers',
    imports: [],
    templateUrl: './speakers.component.html',
    styleUrl: './speakers.component.scss'
})
export class SpeakersComponent implements OnInit, OnDestroy {
    readonly TRANSITION_DURATION = 300;

    private speakersService = inject(SpeakersService);
    private platformId = inject(PLATFORM_ID);
    
    private intervalSubscriber?: Subscription;
    isAnimating = signal(false);

    speakers$: Observable<SpeakerModel[]> = this.speakersService.getSpeakers();
    speakers = toSignal<SpeakerModel[], SpeakerModel[]>(this.speakers$, { initialValue: [] });

    visibleItems = signal(3);
    
    currentIndex = signal(this.visibleItems());
    isTransitioning = signal(true);

    @HostListener('window:resize', [])
    onResize(): void {
        this.updateVisibleItems();
    }

    displaySpeakers = computed(() => {
        const s = this.speakers();
        if (s.length === 0) return [];
        const count = this.visibleItems();
        return [...s.slice(-count), ...s, ...s.slice(0, count)];
    });

    trackTransform = computed(() => {
        const basis = 100 / this.visibleItems();
        const offset = this.currentIndex() * basis;
        return `translateX(-${offset}%)`;
    });

    private next$ = new Subject<void>();
    private prev$ = new Subject<void>();

    constructor() {
        merge(
            this.next$.pipe(map(() => 1)),
            this.prev$.pipe(map(() => -1))
        )
        .pipe(takeUntilDestroyed())
        .subscribe(direction => {
            if (this.isAnimating() || this.speakers().length === 0) {
                return;
            }
            this.isAnimating.set(true);
            this.isTransitioning.set(true);
            this.currentIndex.update(i => i + direction);
            setTimeout(() => {
                this.isAnimating.set(false);
            }, this.TRANSITION_DURATION + 50);
        });

        effect((onCleanup) => {
            const index = this.currentIndex();
            const total = this.speakers().length;
            if (total === 0) return;

            const visible = this.visibleItems();
            if (index === visible - 1 || index === total + visible) {
                const timeoutId = setTimeout(() => {
                    this.isTransitioning.set(false);
                    const newIndex = index === visible - 1 ? total + visible - 1 : visible;
                    this.currentIndex.set(newIndex);
                }, this.TRANSITION_DURATION);
                onCleanup(() => clearTimeout(timeoutId));
            }
        });
    }
    
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.updateVisibleItems();
            this.startInterval();
        }
    }

    private updateVisibleItems(): void {
        if (isPlatformBrowser(this.platformId)) {
            const newVisibleCount = window.innerWidth < 768 ? 1 : 3;

            if (this.visibleItems() !== newVisibleCount) {
                this.visibleItems.set(newVisibleCount);
                
                // Reset index to avoid visual bugs on resize
                this.isTransitioning.set(false);
                this.currentIndex.set(newVisibleCount);
                setTimeout(() => this.isTransitioning.set(true), 50);
            }
        }
    }

    onNext(): void { 
        this.next$.next();
        this.resetInterval(); 
    }

    onPrev(): void { 
        this.prev$.next(); 
        this.resetInterval();
    }

    private startInterval(): void {
         if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber = interval(5000).subscribe(() => this.onNext());
        }
    }
    
    private resetInterval(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber?.unsubscribe();
            this.startInterval();
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber?.unsubscribe();
        }
    }
}