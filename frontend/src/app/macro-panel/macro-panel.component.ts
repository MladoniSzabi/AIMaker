import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService, MacroList } from '../backend.service';

@Component({
  selector: 'app-macro-panel',
  templateUrl: './macro-panel.component.html',
  styleUrls: ['./macro-panel.component.scss']
})
export class MacroPanelComponent implements OnInit {

  macros: MacroList = []
  isCreatingNewMacro: boolean = false;
  projectName: string = ""

  @ViewChild('keybinding') keybindingInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('functionpath') functionpathInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  constructor(private backendService: BackendService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params) => {
      let projectName = params.get("projectName")
      if (!projectName) {
        return
      }
      this.projectName = projectName
      this.backendService.getMacroList(projectName).subscribe((macros) => {
        this.macros = macros
      })
    })
  }

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
    this.backendService.makeNewMacro(this.projectName, this.functionpathInput.nativeElement.value, this.keybindingInput.nativeElement.value)
  }

}
