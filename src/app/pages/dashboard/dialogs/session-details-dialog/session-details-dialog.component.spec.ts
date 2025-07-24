import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsDialogComponent } from './session-details-dialog.component';

describe('SessionDetailsDialogComponent', () => {
  let component: SessionDetailsDialogComponent;
  let fixture: ComponentFixture<SessionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
