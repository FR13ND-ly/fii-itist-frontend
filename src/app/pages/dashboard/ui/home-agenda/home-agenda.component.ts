import { Component, inject } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { SessionDetailsDialogComponent } from '../../dialogs/session-details-dialog/session-details-dialog.component';
import { PauseDetailsDialogComponent } from '../../dialogs/pause-details-dialog/pause-details-dialog.component';
import tinycolor from 'tinycolor2';
import { NgStyle } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { SessionsService } from '../../../../core/services/sessions.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'home-agenda',
  imports: [NgStyle],
  templateUrl: './home-agenda.component.html',
  styleUrl: './home-agenda.component.scss'
})
export class HomeAgendaComponent {
    dialog = inject(DialogService);
    agenda: any;
    userService = inject(UserService);
    sessionsService = inject(SessionsService);
    authService = inject(AuthService);

    halls = [
        {
            id: '1',
            name: 'Aula Magna "M. Eminescu"',
            url: 'https://www.example.com/aula-magna',
        },
        {
            id: '2',
            name: 'Sala de Conferințe "I. Creangă"',
            url: 'https://www.example.com/sala-conferinte',
        },
        {
            id: '3',
            name: 'Sala de Studii "T. Arghezi"',
            url: 'https://www.example.com/sala-studii',
        },
        {
            id: '4',
            name: 'Sala de Examinări "G. Coșbuc"',
            url: 'https://www.example.com/sala-examinari',
        },
        {
            id: '5',
            name: 'Sala de Proiecte "L. Blaga"',
            url: 'https://www.example.com/sala-proiecte',
        }
    ]

    timeSpans = [
        {
            id: '1',
            startTime: '09:00',
            endTime: '10:30',
            noHalls: false,
            details: {
                title: '',
                location: 'Aula Magna "M. Eminescu"',
            }
        },
        {
            id: '2',
            startTime: '11:00',
            endTime: '12:30',
            noHalls: false,
            details: {
                title: '',
                location: 'Aula Magna "M. Eminescu"',
            }
        },
        {
            id: '3',
            startTime: '13:00',
            endTime: '14:30',
            noHalls: false,
            details: {
                title: '',
                location: 'Aula Magna "M. Eminescu"',
            }
        },
        {
            id: '4',
            startTime: '14:30',
            endTime: '15:00',
            noHalls: true,
            details: {
                title: 'Coffee Break',
                location: 'Aula Magna "M. Eminescu"',
            }
        },
        {
            id: '5',
            startTime: '15:00',
            endTime: '16:30',
            noHalls: false,
            details: {
                title: '',
                location: 'Aula Magna "M. Eminescu"',
            }
        }
    ]

    sessions = [
        {
            id: '1',
            title: 'Introducere în Programare',
            description: 'O prezentare generală a conceptelor de bază în programare.',
            hallId: '1',
            timeSpanId: '1',
            type: 'Soft Skills',
            typeColor: '#FACC15', // yellow-400
            speakers: [
                {
                    name: 'Ion Popescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                },
                {
                    name: 'Ion Popescu Jr.',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '2',
            title: 'Dezvoltarea Web Modernă',
            description: 'Tehnologii și instrumente pentru dezvoltarea web.',
            hallId: '2',
            timeSpanId: '2',
            type: 'Frontend',
            typeColor: '#3B82F6', // blue-500
            speakers: [
                {
                    name: 'Maria Ionescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '3',
            title: 'Designul Interfeței Utilizatorului',
            description: 'Principii de bază în designul interfeței utilizatorului.',
            hallId: '3',
            timeSpanId: '3',
            type: 'UI/UX',
            typeColor: '#EC4899', // pink-500
            speakers: [
                {
                    name: 'Andrei Vasilescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                },
                {
                    name: 'Andrei Vasilescu Jr.',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '4',
            title: 'Dezvoltarea Aplicațiilor Mobile',
            description: 'Tehnologii și instrumente pentru dezvoltarea aplicațiilor mobile.',
            hallId: '4',
            timeSpanId: '5',
            type: 'Mobile',
            typeColor: '#8B5CF6', // purple-600
            speakers: [
                {
                    name: 'Elena Georgescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                },
                {
                    name: 'Elena Georgescu Jr.',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '5',
            title: 'Inteligența Artificială și Machine Learning',
            description: 'Introducere în conceptele de bază ale inteligenței artificiale și machine learning.',
            hallId: '5',
            timeSpanId: '1',
            type: 'AI/ML',
            typeColor: '#16A34A', // green-600
            speakers: [
                {
                    name: 'Cristian Dumitru',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '6',
            title: 'Securitatea Cibernetică',
            description: 'Principii de bază în securitatea cibernetică și protecția datelor.',
            hallId: '1',
            timeSpanId: '2',
            type: 'Security',
            typeColor: '#EF4444', // red-500
            speakers: [
                {
                    name: 'Ana Maria Radu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '7',
            title: 'Cloud Computing și DevOps',
            description: 'Tehnologii și instrumente pentru cloud computing și DevOps.',
            hallId: '2',
            timeSpanId: '3',
            type: 'DevOps',
            typeColor: '#4F46E5', // indigo-600
            speakers: [
                {
                    name: 'George Popa',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '8',
            title: 'Blockchain și Criptomonede',
            description: 'Introducere în tehnologia blockchain și criptomonede.',
            hallId: '3',
            timeSpanId: '5',
            type: 'Blockchain',
            typeColor: '#EA580C', // orange-600
            speakers: [
                {
                    name: 'Ioana Marin',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '9',
            title: 'Testarea Software-ului',
            description: 'Tehnici și instrumente pentru testarea software-ului.',
            hallId: '4',
            timeSpanId: '1',
            type: 'QA',
            typeColor: '#84CC16', // lime-500
            speakers: [
                {
                    name: 'Vlad Ionescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '10',
            title: 'Managementul Proiectelor IT',
            description: 'Principii de bază în managementul proiectelor IT.',
            hallId: '5',
            timeSpanId: '2',
            type: 'Soft Skills',
            typeColor: '#FACC15',
            speakers: [
                {
                    name: 'Raluca Stanescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '11',
            title: 'Etica în Tehnologie',
            description: 'Discuții despre etica în tehnologie și responsabilitatea socială.',
            hallId: '1',
            timeSpanId: '3',
            type: 'Soft Skills',
            typeColor: '#FACC15',
            speakers: [
                {
                    name: 'Mihai Petrescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '12',
            title: 'Inovație și Antreprenoriat în IT',
            description: 'Cum să dezvolți o idee inovatoare și să o transformi într-un business de succes.',
            hallId: '2',
            timeSpanId: '5',
            type: 'Soft Skills',
            typeColor: '#FACC15',
            speakers: [
                {
                    name: 'Sorin Ionescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '13',
            title: 'Realitate Virtuală și Augmentată',
            description: 'Tehnologii și aplicații în realitatea virtuală și augmentată.',
            hallId: '3',
            timeSpanId: '1',
            type: 'AR/VR',
            typeColor: '#14B8A6', // teal-500
            speakers: [
                {
                    name: 'Claudia Radu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '14',
            title: 'Internet of Things (IoT)',
            description: 'Introducere în Internet of Things și aplicațiile sale.',
            hallId: '4',
            timeSpanId: '2',
            type: 'IoT',
            typeColor: '#06B6D4', // cyan-500
            speakers: [
                {
                    name: 'Florin Popescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '15',
            title: 'Programare Avansată în Python',
            description: 'Tehnici avansate de programare în Python.',
            hallId: '5',
            timeSpanId: '3',
            type: 'Backend',
            typeColor: '#4B5563', // gray-600
            speakers: [
                {
                    name: 'Andreea Ionescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        },
        {
            id: '16',
            title: 'Dezvoltarea Jocurilor Video',
            description: 'Cum să dezvolți jocuri video folosind Unity și Unreal Engine.',
            hallId: '1',
            timeSpanId: '5',
            type: 'Game Dev',
            typeColor: '#F43F5E', // rose-500
            speakers: [
                {
                    name: 'Dan Marinescu',
                    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6FuIio6dbTNFInIXI8S03NS_IEBNBhTasQ&s',
                    linkedInUrl: 'https://www.linkedin.com/in/ionpopescu/'
                }
            ]
        }
    ];

    enrolments$ = this.userService.getEnrolments(this.authService.getUserData().id);


    getTextColor(bgColor: string): string {
        return tinycolor(bgColor).darken(30).toHexString();
    }

    ngOnInit() {
        this.sessionsService.getTimeSlots().subscribe((timeSpans: any) => {
            this.timeSpans = timeSpans;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
        });
        this.sessionsService.getHalls().subscribe((halls: any) => {
            this.halls = halls;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
        });
        this.sessionsService.getSessions().subscribe((sessions: any) => {
            this.sessions = sessions;
            this.buildAgenda(this.timeSpans, this.halls, this.sessions);
            this.enrolments$.subscribe((enrolments: any) => {
                enrolments.forEach((enrolment: any) => {
                    this.sessions.forEach((session: any) => {
                        if (session._id === enrolment.sessionId) {
                            session.enrolled = true;
                        }
                    });
                });
            });
        });
    }

    buildAgenda(timeSpans: any[], halls: any[], sessions: any[]) {
        this.agenda = timeSpans.map(time => {
            if (time.noHalls) {
                return [{
                    ...time,
                    halls: [],
                    noHalls: true
                }];
            }
            const row = [time];
            for (const hall of halls) {
                const session = sessions.find(s =>
                    s.timeSlotId === time._id && s.hallId === hall._id
                );
                if (session) {
                    session.hallName = hall.name;
                    session.startTime = time.startTime;
                    session.endTime = time.endTime;
                    session.enrolled = false
                }
                row.push(session ?? null);
            }
            return row;
        });
    }

    openSessionDetails(session: any) {
        this.dialog.open(SessionDetailsDialogComponent, {
            data: session
        });
    }

    openPauseDetails(pause: any) {
        this.dialog.open(PauseDetailsDialogComponent, {
            data: pause
        });
    }
}
