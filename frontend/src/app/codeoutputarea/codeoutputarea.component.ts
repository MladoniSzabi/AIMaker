import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeoutputarea',
  templateUrl: './codeoutputarea.component.html',
  styleUrls: ['./codeoutputarea.component.scss']
})
export class CodeoutputareaComponent implements OnInit {

  lines: string[] = []

  constructor() { }

  ngOnInit(): void {
  }

  clearConsole() {
    this.lines = []
  }

}
