import { Component } from '@angular/core';

@Component({
    selector: 'lp-gallery',
    imports: [],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
    galleryItems = [
        {
            imageUrl: 'gallery/gallery1.webp',
            title: 'Gallery Item 1',
        },
        {
            imageUrl: 'gallery/gallery2.webp',
            title: 'Gallery Item 2',
        },
        {
            imageUrl: 'gallery/gallery3.webp',
            title: 'Gallery Item 3',
        },
        {
            imageUrl: 'gallery/gallery4.webp',
            title: 'Gallery Item 4',
        }
    ]
}
