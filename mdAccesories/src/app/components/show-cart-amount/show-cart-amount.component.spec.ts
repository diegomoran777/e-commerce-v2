import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartAmountComponent } from './show-cart-amount.component';

describe('ShowCartAmountComponent', () => {
  let component: ShowCartAmountComponent;
  let fixture: ComponentFixture<ShowCartAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowCartAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCartAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
