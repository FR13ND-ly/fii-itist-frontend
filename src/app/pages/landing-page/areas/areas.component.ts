import { Component } from '@angular/core';

@Component({
    selector: 'lp-areas',
    imports: [],
    templateUrl: './areas.component.html',
    styleUrl: './areas.component.scss'
})
export class AreasComponent {
    areas = [
        {
            icon: 'desktop_windows',
            title: 'Frontend',
            description: 'Descoperiți cum să creați interfețe atractive și interactive pentru utilizatori, utilizând tehnologii precum HTML, CSS și JavaScript.'
        },
        {
            icon: 'host',
            title: 'Backend',
            description: 'Învață cum să dezvolți și să gestionezi servere, baze de date și logica aplicațiilor care susțin funcționalitatea frontend-ului.'
        },
        {
            icon: 'connect_without_contact',
            title: 'Soft skills',
            description: 'Îmbunătățiți-vă abilitățile de comunicare, management al timpului și colaborare eficientă, esențiale pentru succesul în IT.'
        },
        {
            icon: 'network_intel_node',
            title: 'ML / AI / VR',
            description: 'Explorați lumea inteligenței artificiale, învățării automate și realității virtuale pentru a crea aplicații inovatoare și de ultimă generație.'
        },
        {
            icon: 'experiment',
            title: 'QA',
            description: 'Învață tehnici de testare și asigurare a calității pentru a garanta că software-ul funcționează corect și îndeplinește toate cerințele.'
        },
        {
            icon: 'mobile_wrench',
            title: 'Mobile',
            description: 'Află cum să dezvolți aplicații mobile performante și user-friendly pentru platforme precum iOS și Android.'
        }
    ]
}
