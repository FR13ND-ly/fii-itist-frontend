import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SessionComponent } from './session.component';
import { DetailsComponent } from './details/details.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { AttendancesComponent } from './attendances/attendances.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: SessionComponent, children: [
        { path: '', component: DetailsComponent },
        { path: 'attendances', component: AttendancesComponent },
        { path: 'enrolments', component: EnrolmentsComponent }
      ]
      }
    ])
  ]
})
export class SessionModule { }
