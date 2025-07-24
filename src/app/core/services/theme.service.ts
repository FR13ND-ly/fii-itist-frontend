import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'dark-mode';

  isDarkMode$ = new BehaviorSubject<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTheme();
    }
  }

  toggleDarkMode(enable: boolean): void {
    const html = document.documentElement;
    if (enable) {
      html.classList.add('dark');
      localStorage.setItem(this.STORAGE_KEY, 'true');
      this.isDarkMode$.next(true);
    } else {
      html.classList.remove('dark');
      localStorage.setItem(this.STORAGE_KEY, 'false');
      this.isDarkMode$.next(false);
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  private loadTheme(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);

    let useDark = false;

    if (saved === null) {
      useDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      useDark = saved === 'true';
    }

    if (useDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    this.isDarkMode$.next(useDark);
  }
}
