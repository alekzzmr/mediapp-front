import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoComponent } from './signo.component';

describe('SignoComponent', () => {
  let component: SignoComponent;
  let fixture: ComponentFixture<SignoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
