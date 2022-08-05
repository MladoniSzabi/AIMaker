import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-output-area',
  templateUrl: './code-output-area.component.html',
  styleUrls: ['./code-output-area.component.scss']
})
export class CodeOutputAreaComponent implements OnInit {

  lines: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  clearConsole() {
    this.lines = []
  }

}
