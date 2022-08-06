import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; import { BackendService } from '../backend.service';
;
import { CodeAreaComponent } from '../code-area/code-area.component';
import { KeybindingHandler } from '../keybindings';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav = {} as MatSidenav;
  @ViewChild('codearea') codearea: CodeAreaComponent = {} as CodeAreaComponent;

  constructor(private backendService: BackendService) { }

  ngAfterViewInit(): void {
    this.sidenav.open()
  }

  runCommand(event: string): void {
    KeybindingHandler.runCommand(event, this.codearea, this.backendService)
  }
  
  onRecorded(event: string) {
    for(let line of event.split("\n").reverse()) {
      this.codearea.addLine(line, 0)
    }
  }

}
