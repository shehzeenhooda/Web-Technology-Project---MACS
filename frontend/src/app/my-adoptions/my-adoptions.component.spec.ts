import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdoptionsComponent } from './my-adoptions.component';

describe('MyAdoptionsComponent', () => {
  let component: MyAdoptionsComponent;
  let fixture: ComponentFixture<MyAdoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAdoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
