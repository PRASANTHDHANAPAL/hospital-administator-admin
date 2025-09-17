import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorConsultationComponent } from './update-doctor-consultation.component';

describe('UpdateDoctorConsultationComponent', () => {
  let component: UpdateDoctorConsultationComponent;
  let fixture: ComponentFixture<UpdateDoctorConsultationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDoctorConsultationComponent]
    });
    fixture = TestBed.createComponent(UpdateDoctorConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
