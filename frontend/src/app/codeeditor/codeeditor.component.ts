import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CodeareaComponent } from '../codearea/codearea.component';
import { KeybindingHandler } from '../keybindings';

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.scss']
})
export class CodeeditorComponent implements AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav = {} as MatSidenav;
  @ViewChild('codearea') codearea: CodeareaComponent = {} as CodeareaComponent;

  constructor() { }

  ngAfterViewInit(): void {
    this.sidenav.open()
  }

  runCommand(event: string): void {
    KeybindingHandler.runCommand(event, this.codearea)
  }
  
}
