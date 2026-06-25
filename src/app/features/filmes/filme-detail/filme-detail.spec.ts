import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetail } from './filme-detail';

describe('FilmeDetail', () => {
  let component: FilmeDetail;
  let fixture: ComponentFixture<FilmeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmeDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
