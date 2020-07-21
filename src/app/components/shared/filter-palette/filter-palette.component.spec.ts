import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPaletteComponent } from './filter-palette.component';

describe('FilterPaletteComponent', () => {
  let component: FilterPaletteComponent;
  let fixture: ComponentFixture<FilterPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
