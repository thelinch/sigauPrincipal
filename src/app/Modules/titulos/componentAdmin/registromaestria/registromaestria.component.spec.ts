import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistromaestriaComponent } from './registromaestria.component';

describe('RegistromaestriaComponent', () => {
  let component: RegistromaestriaComponent;
  let fixture: ComponentFixture<RegistromaestriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistromaestriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistromaestriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
