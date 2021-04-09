import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselAlternativeComponent } from './carrousel-alternative.component';

describe('CarrouselAlternativeComponent', () => {
  let component: CarrouselAlternativeComponent;
  let fixture: ComponentFixture<CarrouselAlternativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrouselAlternativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrouselAlternativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
