import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalafondComponent } from './scalafond.component';

describe('ScalafondComponent', () => {
  let component: ScalafondComponent;
  let fixture: ComponentFixture<ScalafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalafondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
