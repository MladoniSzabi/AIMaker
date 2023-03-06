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

  constructor(private backendService: BackendService) {
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  ngAfterViewInit(): void {
    this.sidenav.open()

    document.addEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown(event: KeyboardEvent): boolean {
    let event_string = KeybindingHandler.eventToString(event)
    console.log(event_string, this.codearea, this.backendService)
    if (KeybindingHandler.handleKeybinding(event_string, this.codearea, this.backendService)) {
      console.log("Ran")
      event.preventDefault()
      return false
    }
    return true
  }

  runCommand(event: string): void {
    KeybindingHandler.runCommand(event, this.codearea, this.backendService)
  }

  onRecorded(event: string) {
    this.codearea.insert(event, { line: 0, char: 0 })
  }

}
