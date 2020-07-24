import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-filter-palette',
  templateUrl: './side-filter-palette.component.html',
  styleUrls: ['./side-filter-palette.component.css'],
})
export class SideFilterPaletteComponent implements OnInit {
  @Input() showMe: boolean;
  constructor() {}

  ngOnInit(): void {}
}
