import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationaddComponent } from './consultationadd.component';

describe('ConsultationaddComponent', () => {
  let component: ConsultationaddComponent;
  let fixture: ComponentFixture<ConsultationaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationaddComponent]
    });
    fixture = TestBed.createComponent(ConsultationaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
