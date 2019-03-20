import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotituladoComponent } from './registrotitulado.component';

describe('RegistrotituladoComponent', () => {
  let component: RegistrotituladoComponent;
  let fixture: ComponentFixture<RegistrotituladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrotituladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrotituladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
