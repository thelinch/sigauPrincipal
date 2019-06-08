import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRequisitoComponent } from './lista-requisito.component';

describe('ListaRequisitoComponent', () => {
  let component: ListaRequisitoComponent;
  let fixture: ComponentFixture<ListaRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
