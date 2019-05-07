import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroareaComponent } from './registroarea.component';

describe('RegistroareaComponent', () => {
  let component: RegistroareaComponent;
  let fixture: ComponentFixture<RegistroareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
