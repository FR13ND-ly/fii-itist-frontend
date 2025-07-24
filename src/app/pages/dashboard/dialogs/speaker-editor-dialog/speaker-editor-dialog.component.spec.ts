import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerEditorDialogComponent } from './speaker-editor-dialog.component';

describe('SpeakerEditorDialogComponent', () => {
  let component: SpeakerEditorDialogComponent;
  let fixture: ComponentFixture<SpeakerEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeakerEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeakerEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
