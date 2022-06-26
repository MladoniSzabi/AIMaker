import { Component, Input, OnInit } from '@angular/core';
import { KeybindingHandler, TextEditor, selectedTextDict } from '../keybindings';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service'

@Component({
  selector: 'app-codearea',
  templateUrl: './codearea.component.html',
  styleUrls: ['./codearea.component.scss']
})
export class CodeareaComponent implements OnInit, TextEditor {

  fileName: string = ""

  code: string[] = [""]

  cursorLine: number = 0
  cursorChar: number = 0

  previousCharPos: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private backendService: BackendService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if(params.get("fileName")) {
        this.fileName = params.get("fileName") || "New File"
        this.titleService.setTitle(params.get("projectName") + " - " + params.get("fileName"))
        this.backendService.loadfile(params.get("fileName") || "").subscribe((retval) => {
          this.code = retval.split("\n")
          this.cursorChar = 0
          this.cursorLine = 0
        })
      } else {
        this.titleService.setTitle("New File")
      }
    })
  }
  getFileName(): string {
    return this.fileName
  }
  addLine(text: string, lineNumber: number): string[] {
    this.code.splice(lineNumber, 0, ...[text])
    return this.code
  }

  getText(): string[] {
    return this.code
  }

  getLine(lineNumber: number): string {
    return this.code[lineNumber]
  }

  doesElementContain(parentElement: Element, childElement: Node): boolean {
    if (parentElement == childElement)
      return true

    for (let i = 0; i < parentElement.childNodes.length; i++)
      if (parentElement.childNodes[i] == childElement)
        return true;

    return false
  }

  getSelectedText(): selectedTextDict {
    let possiblyNullSelection = window.getSelection()
    let possiblyNullCodeInputArea = document.getElementById("codeinputarea")
    let retval: selectedTextDict = {
      startPosition: { line: 0, char: 0 },
      endPosition: { line: 0, char: 0 },
      text: []
    }
    if (possiblyNullSelection && possiblyNullCodeInputArea) {
      let selection: Selection = possiblyNullSelection
      let codearea: HTMLElement = possiblyNullCodeInputArea
      for (let rangeid = 0; rangeid < selection.rangeCount; rangeid++) {

        let range = selection.getRangeAt(rangeid)
        let startline: number = 0, endline: number = 0, startoffset: number = 0, endoffset: number = 0

        for (let elementid = 0; elementid < codearea.children.length; elementid++) {

          if (this.doesElementContain(codearea.children[elementid], range.startContainer)) {
            if (rangeid == 0) {
              retval.startPosition.line = elementid
              retval.startPosition.char = range.startOffset
            }
            startline = elementid
            startoffset = range.startOffset
          }

          if (this.doesElementContain(codearea.children[elementid], range.endContainer)) {
            if (rangeid == selection.rangeCount - 1) {
              retval.endPosition.line = elementid
              retval.endPosition.char = range.endOffset
            }
            endline = elementid
            endoffset = range.endOffset
          }
        }

        for (let l = startline; l <= endline; l++) {
          let textline = ""
          if (startline == endline && startline == l) {
            textline = this.code[l].substring(startoffset, endoffset)
            retval.text.push()
          } else if (startline == l) {
            textline = this.code[l].substring(startoffset, this.code[startline].length)
          } else if (endline == l) {
            textline = this.code[l].substring(0, endoffset)
          } else {
            textline = this.code[l]
          }

          if (textline)
            retval.text.push(textline)
        }
      }

    }

    return retval
  }

  getCursorPosition(): { line: number; char: number; } {
    return {
      line: this.cursorLine,
      char: this.cursorChar
    }
  }

  setCursorPosition(position: { line: number; char: number; }): void {
    this.cursorLine = position.line
    this.cursorChar = position.char
  }

  ngOnInit(): void {
    this.cursorLine = this.code.length - 1;
    this.cursorChar = this.code[this.cursorLine].length
    this.previousCharPos = this.cursorChar
  }

  handleArrowKeys(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.key == "ArrowLeft") {
      console.log(this.previousCharPos)
      this.cursorChar--
      if (this.cursorChar < 0) {
        if (this.cursorLine > 0) {
          this.cursorLine--;
          this.cursorChar = this.code[this.cursorLine].length
        }
        else {
          this.cursorChar = 0
        }
      }
      this.previousCharPos = this.cursorChar
      return true
    }
    if (kbEvent.key == "ArrowRight") {
      this.cursorChar++
      if (this.cursorChar > this.code[this.cursorLine].length) {
        if (this.cursorLine < this.code.length - 1) {
          this.cursorChar = 0;
          this.cursorLine++;
        } else {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
      this.previousCharPos = this.cursorChar
      return true
    }
    if (kbEvent.key == "ArrowUp") {
      this.cursorLine--
      if (this.cursorLine < 0) {
        this.cursorLine = 0
        this.cursorChar = 0
      } else {
        this.cursorChar = this.previousCharPos
        if (this.cursorChar > this.code[this.cursorLine].length) {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
      return true;
    }
    if (kbEvent.key == "ArrowDown") {
      this.cursorLine++
      if (this.cursorLine >= this.code.length) {
        this.cursorLine = this.code.length - 1
        this.cursorChar = this.code[this.cursorLine].length
      } else {
        this.cursorChar = this.previousCharPos
        if (this.cursorChar > this.code[this.cursorLine].length) {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
      return true;
    }
    return false;
  }

  handleHotkey(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.key == "End") {
      this.cursorChar = this.code[this.cursorLine].length
      return true
    }
    if (kbEvent.key == "Home") {
      this.cursorChar = 0
      return true
    }
    return false
  }

  handleBackspace(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.key == "Backspace") {
      if (this.cursorChar > 0) {
        let line: string = this.code[this.cursorLine]
        this.code[this.cursorLine] = line.substring(0, this.cursorChar - 1) + line.substring(this.cursorChar)
        this.cursorChar--;
      } else {
        if (this.cursorLine > 0) {
          let line: string = this.code[this.cursorLine]
          this.code[this.cursorLine - 1] = this.code[this.cursorLine - 1].concat(line);
          this.code.splice(this.cursorLine, 1)
          this.cursorLine -= 1;
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
      return true;
    }
    return false;
  }

  handleEnter(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.key == "Enter") {
      let indent: string = ""
      let line: string = this.code[this.cursorLine]
      for (let i = 0; i < line.length; i++) {
        if (line[i] == ' ') {
          indent += " ";
        } else {
          break
        }
      }
      if (this.cursorChar != 0 && this.code[this.cursorLine][this.cursorChar - 1] == "{") {
        this.code[this.cursorLine] = indent + line.substring(this.cursorChar)
        this.code = this.code.slice(0, this.cursorLine).concat([line.substring(0, this.cursorChar), indent + "   "]).concat(this.code.slice(this.cursorLine))
        this.cursorChar = indent.length + 3
      } else {
        this.code[this.cursorLine] = indent + line.substring(this.cursorChar)
        this.code = this.code.slice(0, this.cursorLine).concat([line.substring(0, this.cursorChar)]).concat(this.code.slice(this.cursorLine))
        this.cursorChar = indent.length
      }
      this.cursorLine++
      return true
    }
    return false
  }

  handleSingleKey(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.key.length == 1) {
      let line: string = this.code[this.cursorLine]
      if (kbEvent.key == "{") {
        this.code[this.cursorLine] = line.substring(0, this.cursorChar) + kbEvent.key + "}" + line.substring(this.cursorChar)
      } else {
        this.code[this.cursorLine] = line.substring(0, this.cursorChar) + kbEvent.key + line.substring(this.cursorChar)
      }
      this.cursorChar++
      return true
    }
    return false
  }

  onPaste(event: any) {
    KeybindingHandler.runCommand("pasteCommand", this, this.backendService, event)
  }

  eventToString(kbEvent: KeyboardEvent): string {
    let retval =
      (kbEvent.ctrlKey ? "CTRL_" : "") +
      (kbEvent.altKey ? "ALT_" : "") +
      (kbEvent.shiftKey ? "SHIFT_" : "") +
      kbEvent.key.toUpperCase()
    return retval
  }

  onPress(event: any) {

    let kbEvent: KeyboardEvent = (event as KeyboardEvent);

    ///there is no API to read the clipboard from javascript
    ///the only way to read the clipboard is through a clipboard event
    ///this makes sure that the function returns true so that the event
    ///is not marked as consumed but instead let the browser handle the
    ///event and therefore create a clipboard event.
    if (kbEvent.key == "v" && kbEvent.ctrlKey && !kbEvent.shiftKey && !kbEvent.altKey) {
      return true
    }

    if (KeybindingHandler.handleKeybinding(this.eventToString(kbEvent), this, this.backendService)) { }
    else if (this.handleSingleKey(kbEvent)) { }
    else if (this.handleEnter(kbEvent)) { }
    else if (this.handleBackspace(kbEvent)) { }
    else if (this.handleArrowKeys(kbEvent)) { }
    else {
      console.log(kbEvent.key)
      return true
    }

    return false;
  }

}
