import { Component, computed, effect, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { delay, interval, map, merge, Observable, of, Subject } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { SpeakersService } from '../../../core/services/speakers.service';

@Component({
    selector: 'lp-speakers',
    imports: [],
    templateUrl: './speakers.component.html',
    styleUrl: './speakers.component.scss'
})
export class SpeakersComponent implements OnInit, OnDestroy {
    readonly VISIBLE_ITEMS = 3;
    readonly TRANSITION_DURATION = 300;

    speakersService = inject(SpeakersService);
    
    platformId = inject(PLATFORM_ID);
    intervalSubscriber: any;
    isAnimating = signal(false);

    speakers$: Observable<any> = this.speakersService.getSpeakers()

    speakers = toSignal(this.speakers$, { initialValue: [] });
    currentIndex = signal(this.VISIBLE_ITEMS);
    isTransitioning = signal(true);

    displaySpeakers = computed(() => {
        const s = this.speakers();
        if (s.length === 0) return [];
        const count = this.VISIBLE_ITEMS;
        return [...s.slice(-count), ...s, ...s.slice(0, count)];
    });

    trackTransform = computed(() => {
        const basis = 100 / this.VISIBLE_ITEMS;
        const offset = this.currentIndex() * basis;
        return `translateX(-${offset}%)`;
    });

    next$ = new Subject<void>();
    prev$ = new Subject<void>();

    constructor() {
        if (!isPlatformBrowser(this.platformId)) return;
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

            const visible = this.VISIBLE_ITEMS;
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
        if (!isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber = interval(5000).subscribe(() =>
                this.onNext()
            );
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

    resetInterval() {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber.unsubscribe();
            this.intervalSubscriber = interval(5000).subscribe(() =>
                this.onNext()
            );
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber.unsubscribe();
        }
    }
}
