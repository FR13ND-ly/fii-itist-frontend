import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IsAdminDirective } from '../../../../core/directives/is-admin.directive';

@Component({
  selector: 'user-sidenav',
  imports: [RouterLink, IsAdminDirective, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
sections = [
    {
      title: '',
      items: [
        {
          name: 'Acasă',
          icon: 'home',
          href: '/',
        },
        {
          name: 'Noutăți',
          icon: 'news',
          href: '/news',
        },
      ]
    },
    {
      title: 'Membri',
      items: [
        {
          name: 'AG-uri',
          icon: 'travel_explore',
          href: '/meetings',
        },
        {
          name: "Departamente",
          icon: 'category',
          href: '/departments',
        },
        {
          name: "Activitate",
          icon: 'manage_history',
          href: '/activity',
        },
        {
          name: "Resurse",
          icon: 'quick_reference',
          href: '/resources',
        }
      ]
    },
    {
      title: "Setări",
      items: [
        {
          name: "Cont",
          icon: 'tune',
          href: '/settings',
        },
      ]
    }
  ]
}
