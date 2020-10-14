import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreFsComponent } from './sobre-fs.component';

describe('SobreFsComponent', () => {
  let component: SobreFsComponent;
  let fixture: ComponentFixture<SobreFsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SobreFsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SobreFsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
