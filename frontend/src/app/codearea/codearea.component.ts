import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codearea',
  templateUrl: './codearea.component.html',
  styleUrls: ['./codearea.component.scss']
})
export class CodeareaComponent implements OnInit {

  code: string[] = ["asdkjashdkfjakshkjaskjdfh", "dsa"]

  cursorLine: number = 0
  cursorChar: number = 0

  previousCharPos: number = 0

  specialKeyStatus = {
    "Control": false,
    "Shift": false,
    "Alt": false
  }

  constructor() { }

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

  handleSpecialKeys(kbEvent: KeyboardEvent, isDown: boolean): boolean {
    if (
      kbEvent.key == "Control" ||
      kbEvent.key == "Shift" ||
      kbEvent.key == "Alt"
    ) {
      this.specialKeyStatus[kbEvent.key] = isDown;
      return true;
    }
    return false;
  }

  handleHotkey(kbEvent: KeyboardEvent): boolean {
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

  onRelease(event: any) {
    let kbEvent: KeyboardEvent = (event as KeyboardEvent);
    if (this.handleSpecialKeys(kbEvent, false)) {
    } else {
      return true
    }
    return false
  }

  onPress(event: any) {
    let kbEvent: KeyboardEvent = (event as KeyboardEvent);
    if (this.handleHotkey(kbEvent)) { }
    else if (kbEvent.key.length == 1) {
      let line: String = this.code[this.cursorLine]
      this.code[this.cursorLine] = line.substring(0, this.cursorChar) + kbEvent.key + line.substring(this.cursorChar)
      this.cursorChar++
    } else if (this.handleBackspace(kbEvent)) { }
    else if (this.handleArrowKeys(kbEvent)) { }
    else if (this.handleSpecialKeys(kbEvent, true)) { }
    else {
      console.log(kbEvent.key)
      return true;
    }

    return false;
  }

}
