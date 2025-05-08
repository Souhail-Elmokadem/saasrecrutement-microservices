import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMinComponent } from './navbar-min.component';

describe('NavbarMinComponent', () => {
  let component: NavbarMinComponent;
  let fixture: ComponentFixture<NavbarMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarMinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
