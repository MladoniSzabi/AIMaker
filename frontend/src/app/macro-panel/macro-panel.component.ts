import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { ModalService } from '../modal.service'
import { MacroList } from '../types';

@Component({
  selector: 'app-macro-panel',
  templateUrl: './macro-panel.component.html',
  styleUrls: ['./macro-panel.component.scss']
})
export class MacroPanelComponent implements OnInit {

  macros: MacroList = []
  isCreatingNewMacro: boolean = false;
  projectName: string = ""
  editMacroIndex: number = -1

  @ViewChild('keybinding') keybindingInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('functionPath') functionPathInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('editKeybinding') editKeybindingInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('editFunctionPath') editFunctionPathInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  constructor(private backendService: BackendService, private activatedRoute: ActivatedRoute, private modalService: ModalService) {
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

  showEditMacro(index: number) {
    this.editMacroIndex = index
  }

  hideCreateMacro() {
    this.isCreatingNewMacro = false
  }

  hideEditMacro() {
    this.editMacroIndex = -1
  }

  submitMacro() {
    this.macros.push({
      keybinding: this.keybindingInput.nativeElement.value,
      path: this.functionPathInput.nativeElement.value,
    })
    this.isCreatingNewMacro = false;
    this.backendService.makeNewMacro(this.projectName, this.functionPathInput.nativeElement.value, this.keybindingInput.nativeElement.value)
  }

  editMacro(index: number) {
    this.macros[index] = {
      keybinding: this.editKeybindingInput.nativeElement.value,
      path: this.editFunctionPathInput.nativeElement.value,
    }
    this.editMacroIndex = -1
    this.backendService.editMacro(this.projectName, index, this.editFunctionPathInput.nativeElement.value, this.editKeybindingInput.nativeElement.value)
  }

  showConfirmDelete(index: number) {
    this.modalService.createConfirmModal(
      "Are you sure you want to delete this macro?",
      () => {
        this.backendService.deleteMacro(this.projectName, index)
        this.macros.splice(index, 1)
      },
      () => { }
    )
  }

}
