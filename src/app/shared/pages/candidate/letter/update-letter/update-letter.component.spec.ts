import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLetterComponent } from './update-letter.component';

describe('UpdateLetterComponent', () => {
  let component: UpdateLetterComponent;
  let fixture: ComponentFixture<UpdateLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
