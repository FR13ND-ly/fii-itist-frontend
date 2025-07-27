import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import path from 'path';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { EnrolmentsComponent } from './enrolments/enrolments.component';
import { AttendancesComponent } from './attendances/attendances.component';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: UserComponent, children: [
        { path: '', component: DetailsComponent },
        { path: 'attendances', component: AttendancesComponent },
        { path: 'enrolments', component: EnrolmentsComponent }
      ]}
    ])
  ]
})
export class UserModule { }
