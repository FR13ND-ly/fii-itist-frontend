import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'lp-about',
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
    platformId = inject(PLATFORM_ID);

    sliderIndex = signal(0);
    intervalSubscriber: any;
    sliderTransform = computed(
        () => `translateX(-${100 * this.sliderIndex()}%)`
    );

    sliderItems = [
        'https://static.vecteezy.com/system/resources/thumbnails/025/067/762/small_2x/4k-beautiful-colorful-abstract-wallpaper-photo.jpg',
        'https://img.freepik.com/free-photo/sunset-silhouettes-trees-mountains-generative-ai_169016-29371.jpg',
        'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
        'https://c4.wallpaperflare.com/wallpaper/297/22/531/lake-blue-moonlight-moon-wallpaper-thumb.jpg',
        'https://t3.ftcdn.net/jpg/05/73/55/12/360_F_573551225_h5mGL6pOLL5mDJi9pz7nYfG8uCppOfvW.jpg',
    ];

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber = interval(5000).subscribe(() =>
                this.next()
            );
        }
    }
    next() {
        this.sliderIndex.set(
            (this.sliderIndex() + 1) % this.sliderItems.length
        );
        this.resetInterval();
    }

    previous() {
        this.sliderIndex.set(
            (this.sliderIndex() - 1 + this.sliderItems.length) % this.sliderItems.length
        );
        this.resetInterval();
    }

    setIndex(index: number) {
        this.sliderIndex.set(index);
        console.log(index)
        this.resetInterval();
    }

    resetInterval() {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber.unsubscribe();
            this.intervalSubscriber = interval(5000).subscribe(() =>
                this.next()
            );
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.intervalSubscriber.unsubscribe();
        }
    }
}
