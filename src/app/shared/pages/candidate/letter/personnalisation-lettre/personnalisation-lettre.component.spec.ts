import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalisationLettreComponent } from './personnalisation-lettre.component';

describe('PersonnalisationLettreComponent', () => {
  let component: PersonnalisationLettreComponent;
  let fixture: ComponentFixture<PersonnalisationLettreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonnalisationLettreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalisationLettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
