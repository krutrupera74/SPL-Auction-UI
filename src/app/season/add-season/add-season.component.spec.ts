import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeasonComponent } from './add-season.component';

describe('AddSeasonComponent', () => {
  let component: AddSeasonComponent;
  let fixture: ComponentFixture<AddSeasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSeasonComponent]
    });
    fixture = TestBed.createComponent(AddSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
