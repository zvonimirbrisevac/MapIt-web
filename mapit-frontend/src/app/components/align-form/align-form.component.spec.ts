import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignFormComponent } from './align-form.component';

describe('AlignFormComponent', () => {
  let component: AlignFormComponent;
  let fixture: ComponentFixture<AlignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
