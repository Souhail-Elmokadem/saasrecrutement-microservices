import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewcvComponent } from './previewcv.component';

describe('PreviewcvComponent', () => {
  let component: PreviewcvComponent;
  let fixture: ComponentFixture<PreviewcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewcvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
