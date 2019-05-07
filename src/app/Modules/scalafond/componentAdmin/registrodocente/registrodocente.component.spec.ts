import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrodocenteComponent } from './registrodocente.component';

describe('RegistrodocenteComponent', () => {
  let component: RegistrodocenteComponent;
  let fixture: ComponentFixture<RegistrodocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrodocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrodocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
