import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export type Col = { name: string, label: string };
export type Row = { [colName: string]: string };

@Component({
  selector: 'app-interactive-table[pagination][rowsPerPage][columns][rows]',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.style.css']
})
export class InteractiveTableComponent implements OnInit {
  @Input()
  pagination: boolean;
  @Input()
  rowsPerPage: number;
  @Input()
  columns: Col[];
  @Input()
  rows: Row[];
  @Input()
  addDisabled = false;
  @Input()
  checkboxOnBoolean = false;

  @Output()
  onAdd = new EventEmitter<void>();
  @Output()
  onEdit = new EventEmitter<number>();
  @Output()
  onDelete = new EventEmitter<number>();

  displayedColumns: string[];

  ngOnInit() {
    this.displayedColumns = ['actions', ...this.columns.map(v => v.name)];
  }
}
