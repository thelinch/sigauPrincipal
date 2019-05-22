import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraradministrativoComponent } from './registraradministrativo.component';

describe('RegistraradministrativoComponent', () => {
  let component: RegistraradministrativoComponent;
  let fixture: ComponentFixture<RegistraradministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistraradministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraradministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
