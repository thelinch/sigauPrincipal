import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrograduadosComponent } from './registrograduados.component';

describe('RegistrograduadosComponent', () => {
  let component: RegistrograduadosComponent;
  let fixture: ComponentFixture<RegistrograduadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrograduadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrograduadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
