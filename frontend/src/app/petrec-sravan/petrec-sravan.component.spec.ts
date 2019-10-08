import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrecSravanComponent } from './petrec-sravan.component';

describe('PetrecSravanComponent', () => {
  let component: PetrecSravanComponent;
  let fixture: ComponentFixture<PetrecSravanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrecSravanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrecSravanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
