import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubscriberComponent } from './select-subscriber.component';

describe('SelectSubscriberComponent', () => {
  let component: SelectSubscriberComponent;
  let fixture: ComponentFixture<SelectSubscriberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSubscriberComponent]
    });
    fixture = TestBed.createComponent(SelectSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
