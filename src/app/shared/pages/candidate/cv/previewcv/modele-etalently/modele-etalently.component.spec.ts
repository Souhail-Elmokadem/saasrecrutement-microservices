import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleEtalentlyComponent } from './modele-etalently.component';

describe('ModeleEtalentlyComponent', () => {
  let component: ModeleEtalentlyComponent;
  let fixture: ComponentFixture<ModeleEtalentlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeleEtalentlyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleEtalentlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
