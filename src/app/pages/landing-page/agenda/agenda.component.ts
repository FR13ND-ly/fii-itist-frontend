import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TalksComponent } from '../../../core/components/talks/talks.component';
import { NoUserDirective } from '../../../core/directives/no-user.directive';

@Component({
    selector: 'lp-agenda',
    imports: [RouterLink, TalksComponent, NoUserDirective],
    templateUrl: './agenda.component.html',
    styleUrl: './agenda.component.scss'
})
export class AgendaComponent {
}
