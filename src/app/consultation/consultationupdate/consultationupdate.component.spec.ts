import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationupdateComponent } from './consultationupdate.component';

describe('ConsultationupdateComponent', () => {
  let component: ConsultationupdateComponent;
  let fixture: ComponentFixture<ConsultationupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationupdateComponent]
    });
    fixture = TestBed.createComponent(ConsultationupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
