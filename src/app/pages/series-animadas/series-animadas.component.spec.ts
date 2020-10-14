import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesAnimadasComponent } from './series-animadas.component';

describe('SeriesAnimadasComponent', () => {
  let component: SeriesAnimadasComponent;
  let fixture: ComponentFixture<SeriesAnimadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesAnimadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesAnimadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
