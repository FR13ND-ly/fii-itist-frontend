import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerEditorDialogComponent } from './partner-editor-dialog.component';

describe('PartnerEditorDialogComponent', () => {
  let component: PartnerEditorDialogComponent;
  let fixture: ComponentFixture<PartnerEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerEditorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
