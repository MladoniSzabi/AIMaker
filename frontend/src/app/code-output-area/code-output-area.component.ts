import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-code-output-area',
  templateUrl: './code-output-area.component.html',
  styleUrls: ['./code-output-area.component.scss']
})
export class CodeOutputAreaComponent implements OnInit {

  lines: string[] = []

  constructor(private backend: BackendService) {
    this.backend.getConsoleOutputPipe().subscribe((message) => {
      if(message.type == "string") {
        this.lines = this.lines.concat(message.message.split("\n"))
      }
    })
  }

  ngOnInit(): void {
  }

  clearConsole() {
    this.lines = []
  }

}
