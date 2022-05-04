import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DnaAnimationComponent } from './dna-animation.component';

describe('DnaAnimationComponent', () => {
  let component: DnaAnimationComponent;
  let fixture: ComponentFixture<DnaAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DnaAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DnaAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
