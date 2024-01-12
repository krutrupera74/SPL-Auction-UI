import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsAddComponent } from './organizations-add.component';

describe('OrganizationsAddComponent', () => {
  let component: OrganizationsAddComponent;
  let fixture: ComponentFixture<OrganizationsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationsAddComponent]
    });
    fixture = TestBed.createComponent(OrganizationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
