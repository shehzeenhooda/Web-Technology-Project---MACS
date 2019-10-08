import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionFormComponent } from './adoption-form.component';

describe('AdoptionFormComponent', () => {
  let component: AdoptionFormComponent;
  let fixture: ComponentFixture<AdoptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
