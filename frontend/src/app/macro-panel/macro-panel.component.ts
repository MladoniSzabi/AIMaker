import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-macro-panel',
  templateUrl: './macro-panel.component.html',
  styleUrls: ['./macro-panel.component.scss']
})
export class MacroPanelComponent implements OnInit {

  macros: { keybinding: string, path: string }[] = []
  isCreatingNewMacro: boolean = false;

  @ViewChild('keybinding') keybindingInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('functionpath') functionpathInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
  }

  showCreateMacro() {
    this.isCreatingNewMacro = true
  }

  hideCreateMacro() {
    this.isCreatingNewMacro = false
  }

  submitMacro() {
    this.macros.push({
      keybinding: this.keybindingInput.nativeElement.value,
      path: this.functionpathInput.nativeElement.value,
    })
    this.isCreatingNewMacro = false;
  }

}
