import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFilterPaletteComponent } from './side-filter-palette.component';

describe('SideFilterPaletteComponent', () => {
  let component: SideFilterPaletteComponent;
  let fixture: ComponentFixture<SideFilterPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideFilterPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFilterPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
