import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCvsComponent } from './list-cvs.component';

describe('ListCvsComponent', () => {
  let component: ListCvsComponent;
  let fixture: ComponentFixture<ListCvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCvsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
