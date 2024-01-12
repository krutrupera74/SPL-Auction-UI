import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAddComponent } from './users-add.component';

describe('UsersAddComponent', () => {
  let component: UsersAddComponent;
  let fixture: ComponentFixture<UsersAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersAddComponent]
    });
    fixture = TestBed.createComponent(UsersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
