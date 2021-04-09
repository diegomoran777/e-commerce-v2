import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavChartsComponent } from './nav-charts.component';

describe('NavChartsComponent', () => {
  let component: NavChartsComponent;
  let fixture: ComponentFixture<NavChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
