import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Interesse } from './interesse';

describe('Interesse', () => {
  let component: Interesse;
  let fixture: ComponentFixture<Interesse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Interesse],
    }).compileComponents();

    fixture = TestBed.createComponent(Interesse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
