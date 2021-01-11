import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';

export type Col = { name: string, label: string };
export type Row = { [colName: string]: string };

@Component({
  selector: 'app-interactive-table[columns][rowsObservable]',
  templateUrl: './interactive-table.component.html',
  styleUrls: ['./interactive-table.style.css']
})
export class InteractiveTableComponent implements OnInit, OnDestroy {
  @Input()
  columns: Col[];
  @Input()
  rowsObservable: Observable<Row[]>;
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
  dataSource = new MatTableDataSource<Row>();
  s: Subscription;

  ngOnInit() {
    this.displayedColumns = ['actions', ...this.columns.map(v => v.name)];
    this.s = this.rowsObservable.subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy() {
    this.s?.unsubscribe();
  }
}
