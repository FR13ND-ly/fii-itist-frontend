import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from '../../../../../core/services/sessions.service';
import { SpeakersService } from '../../../../../core/services/speakers.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { SessionModel } from '../../../../../core/models/session.model';

@Component({
  selector: 'talk-details',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  speakersService = inject(SpeakersService);
  sessionsService = inject(SessionsService);
  router = inject(Router);
  platformId = inject(PLATFORM_ID)

  fb = new FormBuilder();

  session$ = this.sessionsService.getSession(this.route.snapshot.params['id']).pipe(
    tap((session: SessionModel) => {
      this.selectedSpeakers = session.speakers.map((s: any) => s._id);
      this.sessionForm.patchValue({
        type: session.type ?? '',
        typeColor: session.typeColor ?? '#3b82f6',
        title: session.title ?? '',
        description: session.description
      });
    })
  );

  speakers$ = this.speakersService.getSpeakers();
  speakers: any = []
  selectedSpeakers: any = [];

  sessionForm = this.fb.group({
    type: ['', Validators.required],
    typeColor: ['#3b82f6', Validators.required], 
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.speakers$.subscribe((speakers: any) => {
      this.speakers = speakers;
    });
  }

  onSpeakerChange(speakerId: string): void {
    if (this.selectedSpeakers.includes(speakerId)) {
      this.selectedSpeakers = this.selectedSpeakers.filter((id: string) => id !== speakerId);
    } else {
      this.selectedSpeakers.push(speakerId);
    }
  }

  isSpeakerSelected(speakerId: string): boolean {
    return this.selectedSpeakers.includes(speakerId);
  }

  onSubmit(session: SessionModel): void {
    if (this.sessionForm.invalid) {
      return;
    }
    let res = {
        ...this.sessionForm.value,
        speakers: this.selectedSpeakers,
    }
    this.sessionsService.updateSession(session._id, res).subscribe(() => {
      console.log('a')
    })
  }

  onDelete(session: SessionModel): void {
    this.sessionsService.deleteSession(session._id).subscribe(() => {
      this.router.navigate(['/dashboard/sessions']);
    });
  }
}
