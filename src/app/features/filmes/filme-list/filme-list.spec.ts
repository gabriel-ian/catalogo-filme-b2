import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeList } from './filme-list';

describe('FilmeList', () => {
  let component: FilmeList;
  let fixture: ComponentFixture<FilmeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeList],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
