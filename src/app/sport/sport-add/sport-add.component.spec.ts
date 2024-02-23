import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportAddComponent } from './sport-add.component';

describe('SportAddComponent', () => {
  let component: SportAddComponent;
  let fixture: ComponentFixture<SportAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportAddComponent]
    });
    fixture = TestBed.createComponent(SportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
