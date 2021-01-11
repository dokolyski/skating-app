import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-new-session-form',
  templateUrl: './new-session-form.component.html',
  styleUrls: ['./new-session-form.component.css']
})
export class NewSessionFormComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
}

