import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationlettreComponent } from './creationlettre.component';

describe('CreationlettreComponent', () => {
  let component: CreationlettreComponent;
  let fixture: ComponentFixture<CreationlettreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationlettreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationlettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
