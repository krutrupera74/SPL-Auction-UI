import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidTournamentComponent } from './invalid-tournament.component';

describe('InvalidTournamentComponent', () => {
  let component: InvalidTournamentComponent;
  let fixture: ComponentFixture<InvalidTournamentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidTournamentComponent]
    });
    fixture = TestBed.createComponent(InvalidTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
