import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixCvGenererLetterComponent } from './choix-cv-generer-letter.component';

describe('ChoixCvGenererLetterComponent', () => {
  let component: ChoixCvGenererLetterComponent;
  let fixture: ComponentFixture<ChoixCvGenererLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoixCvGenererLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixCvGenererLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
