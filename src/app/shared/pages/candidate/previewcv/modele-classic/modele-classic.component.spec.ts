import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleClassicComponent } from './modele-classic.component';

describe('ModeleClassicComponent', () => {
  let component: ModeleClassicComponent;
  let fixture: ComponentFixture<ModeleClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeleClassicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
