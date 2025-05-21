import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixCreationcvComponent } from './choix-creationcv.component';

describe('ChoixCreationcvComponent', () => {
  let component: ChoixCreationcvComponent;
  let fixture: ComponentFixture<ChoixCreationcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoixCreationcvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixCreationcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
