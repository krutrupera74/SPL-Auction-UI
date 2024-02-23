import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddComponent } from './team-add.component';

describe('TeamAddComponent', () => {
  let component: TeamAddComponent;
  let fixture: ComponentFixture<TeamAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamAddComponent]
    });
    fixture = TestBed.createComponent(TeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
