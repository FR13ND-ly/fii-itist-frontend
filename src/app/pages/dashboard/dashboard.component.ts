import { Component } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./ui/sidenav/sidenav.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, RouterOutlet, SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
