import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrodoctoradoComponent } from './registrodoctorado.component';

describe('RegistrodoctoradoComponent', () => {
  let component: RegistrodoctoradoComponent;
  let fixture: ComponentFixture<RegistrodoctoradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrodoctoradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrodoctoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
