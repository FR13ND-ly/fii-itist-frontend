import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolmentsComponent } from './enrolments.component';

describe('EnrolmentsComponent', () => {
  let component: EnrolmentsComponent;
  let fixture: ComponentFixture<EnrolmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
