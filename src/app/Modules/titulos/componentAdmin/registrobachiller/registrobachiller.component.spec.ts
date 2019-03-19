import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrobachillerComponent } from './registrobachiller.component';

describe('RegistrobachillerComponent', () => {
  let component: RegistrobachillerComponent;
  let fixture: ComponentFixture<RegistrobachillerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrobachillerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrobachillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
