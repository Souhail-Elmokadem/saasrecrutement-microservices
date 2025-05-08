import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationcvComponent } from './creationcv.component';

describe('CreationcvComponent', () => {
  let component: CreationcvComponent;
  let fixture: ComponentFixture<CreationcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreationcvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
