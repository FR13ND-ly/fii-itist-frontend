import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'additional-info-stage',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './additional-info.component.html',
    styleUrl: './additional-info.component.scss'
})
export class AdditionalInfoComponent {
    @Input() additionalInfoForm: any;
    @Output() next = new EventEmitter();
    @Output() previous = new EventEmitter();

    gdpr = false;

    educationLevels = [
        'Liceu',
        'Licență',
        'Master',
        'Doctorat',
    ]

    highSchools = [
        'Colegiul Național, Iași',
        'Colegiul Național „Costache Negruzzi”, Iași',
        'Colegiul Național „Mihai Eminescu”, Iași',
        'Liceul Teoretic de Informatică „Grigore Moisil”, Iași',
        'Colegiul Național „Emil Racoviță”, Iași',
        'Colegiul „Richard Wurmbrand”, Iași',
        'Liceul Teoretic „Dimitrie Cantemir”, Iași',
        'Colegiul Național „Garabet Ibrăileanu”, Iași',
        'Colegiul Național „Vasile Alecsandri”, Iași',
        'Colegiul Național „Mihail Sadoveanu”, Pașcani',
        'Liceul Teoretic „Miron Costin”, Iași',
        'Colegiul Național Pedagogic „Vasile Lupu”, Iași',
        'Liceul Teoretic „Miron Costin”, Pașcani',
        'Liceul Teoretic „Alexandru Ioan Cuza”, Iași',
        'Colegiul Economic Administrativ, Iași',
        'Liceul Teoretic Waldorf, Iași',
        'Colegiul Național de Artă „Octav Băncilă”, Iași',
        'Colegiul Național „Ștefan cel Mare”, Hârlău',
        'Colegiul Economic „Virgil Madgearu”, Iași',
        'Liceul Tehnologic Economic de Turism, Iași',
        'Liceul Tehnologic „Victor Mihăilescu Craiu”, Belcești',
        'Liceul Teoretic „Ion Neculce”, Târgu Frumos',
        'Liceul Teoretic „Bogdan Vodă”, Hălăucești',
        'Liceul Teoretic „Lascar Rosetti”, Răducăneni',
        'Colegiul Tehnic „Gheorghe Asachi”, Iași',
        'Seminarul Teologic Ortodox „Sf. Vasile cel Mare”, Iași',
        'Colegiul Agricol și de Industrie Alimentară „Vasile Adamachi”, Iași',
        'Liceul Tehnologic „Petre P. Carp”, Țibanesti',
        'Colegiul Tehnic de Căi Ferate „Unirea”, Pașcani',
        'Liceul Special „Moldova”, Târgu Frumos',
        'Colegiul Tehnic „Haralamb Vasiliu”, Podu Iloaiei',
        'Colegiul Tehnic „Ioan C. Ștefănescu”, Iași',
        'Colegiul Tehnic „Ion Holban”, Iași',
        'Colegiul Tehnic „Mihail Sturdza”, Iași',
        'Liceul cu Program Sportiv, Iași',
        'Liceul Tehnologic, Hârlău',
        'Liceul Tehnologic, Vladeni',
        'Liceul Tehnologic Agricol „Mihail Kogălniceanu”, Miroslava',
        'Liceul Tehnologic Economic „Nicolae Iorga”, Pașcani',
        'Liceul Tehnologic „Dimitrie Leonida”, Iași',
        'Liceul Tehnologic de Transporturi și de Construcții, Iași',
        'Liceul Tehnologic de Electronică și Telecomunicații „Gheorghe Mârzescu”, Iași',
        'Liceul Tehnologic „Mihai Busuioc”, Pașcani',
        'Liceul Tehnologic „Petru Poni”, Iași',
        'Liceul Tehnologic de Mecatronică și Automatizări, Iași',
        'Liceul Tehnologic „Petru Rareș”, Târgu Frumos',
        'Liceul Tehnologic UCECOM „Spiru Haret”, Iași',
    ]

    universities = [
        {
            name: 'Universitatea "Alexandru Ioan Cuza" din Iaşi',
            faculties: [
                'Centrul de Studii Europene',
                'Facultatea de Biologie',
                'Facultatea de Chimie',
                'Facultatea de Drept',
                'Facultatea de Economie şi Administrarea Afacerilor',
                'Facultatea de Educaţie Fizică şi Sport',
                'Facultatea de Filosofie şi Ştiinţe Social - Politice',
                'Facultatea de Fizică',
                'Facultatea de Geografie şi Geologie',
                'Facultatea de Informatică',
                'Facultatea de Istorie',
                'Facultatea de Litere',
                'Facultatea de Matematică',
                'Facultatea de Psihologie şi Ştiinţe ale Educaţiei',
                'Facultatea de Teologie Ortodoxă',
                'Facultatea de Teologie Romano-Catolică'
            ]
        },
        {
            name: 'Universitatea "Apollonia" din Iaşi',
            faculties: [
                'Facultatea de Medicină Dentară',
                'Facultatea de Ştiinţe ale Comunicării'
            ],
        },
        {            
            name: 'Universitatea "Mihail Kogălniceanu" din Iaşi',
            faculties: [
                'Facultatea de Drept'
            ],
        },
        {            
            name: 'Universitatea "Petre Andrei" din Iaşi',
            faculties: [                
                'Facultatea de  Economie',
                'Facultatea de Asistenţă Socială şi Sociologie',
                'Facultatea de Drept',
                'Facultatea de Psihologie şi Ştiinţele Educaţiei',
                'Facultatea de Psihologie, Ştiinţele Educaţiei şi Asistenţă Socială',
                'Facultatea de Ştiinţe Politice şi Administrative'
            ]
        },
        {            
            name: 'Universitatea de Arte "George Enescu" din Iaşi',
            faculties: [
                'Facultatea de Arte Plastice',
                'Facultatea de Muzică',
                'Facultatea de Teatru'
            ]
        },
        {
            name: 'Universitatea de Medicină şi Farmacie "Gr. T. Popa" din Iaşi',
            faculties: [
                'Facultatea de Bioinginerie Medicală',
                'Facultatea de Farmacie',
                'Facultatea de Medicină',
                'Facultatea de Medicină Dentară'
            ]
        },
        {
            name: 'Universitatea de Ştiinţe Agricole şi Medicină Veterinară "Ion Ionescu de La Brad" din Iaşi',
            faculties: [
                'Facultatea de Agricultură',
                'Facultatea de Horticultură',
                'Facultatea de Medicină Veterinară',
                'Facultatea de Zootehnie'
            ]
        },
        {
            name: 'Universitatea Tehnică "Gheorghe Asachi" din Iaşi',
            faculties: [
                'Facultatea de Arhitectură',
                'Facultatea de Automatică şi Calculatoare',
                'Facultatea de Construcţii şi Instalaţii',
                'Facultatea de Electronică, Telecomunicaţii şi Tehnologia Informaţiei',
                'Facultatea de Hidrotehnică, Geodezie şi Ingineria Mediului',
                'Facultatea de Inginerie Chimică şi Protecţia Mediului',
                'Facultatea de Inginerie Electrică, Energetică şi Informatică Aplicată',
                'Facultatea de Mecanică',
                'Facultatea de Ştiinţa şi Ingineria Materialelor',
                'Facultatea de Textile - Pielărie şi Management Industrial'
            ]
        }
    ]

    faculties: any = []

    educationYearsHighSchool = [
        'Clasa a 9-a',
        'Clasa a 10-a',
        'Clasa a 11-a',
        'Clasa a 12-a',
    ]

    educationYears = [
        'Anul 1',
        'Anul 2',
        'Anul 3',
        'Anul 4',
        'Anul 5',
        'Anul 6',
    ]

    experienceLevels = [
        'Niciuna',
        '0-1 an',
        '1-2 ani',
        '2-3 ani',
        '3+ ani',
    ]

    occupations = [
        'Angajat full-time',
        'Angajat part-time',
        'Internship',
        'Elev/Student',
    ];

    onSelectUniversity(event: any) {
        this.faculties = this.universities.find((university: any) => university.name === event.value)?.faculties || [];
    }

    handleSubmit() {
        this.next.emit()
    }

    previousStage() {
        this.previous.emit();
    }
}
