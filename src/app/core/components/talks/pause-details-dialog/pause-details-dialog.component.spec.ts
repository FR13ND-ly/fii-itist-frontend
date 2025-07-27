import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseDetailsDialogComponent } from './pause-details-dialog.component';

describe('PauseDetailsDialogComponent', () => {
  let component: PauseDetailsDialogComponent;
  let fixture: ComponentFixture<PauseDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PauseDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PauseDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
