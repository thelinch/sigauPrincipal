import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalModulosComponent } from './principal-modulos.component';

describe('PrincipalModulosComponent', () => {
  let component: PrincipalModulosComponent;
  let fixture: ComponentFixture<PrincipalModulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrincipalModulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
