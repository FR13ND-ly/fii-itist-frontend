import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionEditorDialogComponent } from './session-editor-dialog.component';

describe('SessionEditorDialogComponent', () => {
  let component: SessionEditorDialogComponent;
  let fixture: ComponentFixture<SessionEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
