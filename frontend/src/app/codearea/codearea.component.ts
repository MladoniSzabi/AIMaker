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

  handleHotkey(kbEvent: KeyboardEvent): boolean {
    if (kbEvent.ctrlKey && kbEvent.key == "c" && !kbEvent.shiftKey && !kbEvent.altKey) {
      let sel = window.getSelection()
      if (sel) {
        navigator.clipboard.writeText(sel.toString())
      }
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
      let line: String = this.code[this.cursorLine]
      this.code[this.cursorLine] = line.substring(this.cursorChar)
      this.code = this.code.slice(0, this.cursorLine).concat([line.substring(0, this.cursorChar)]).concat(this.code.slice(this.cursorLine))
      this.cursorLine++;
      this.cursorChar = 0
      return true
    }
    return false
  }

  onPaste(event: any) {
    let pasteEvent: ClipboardEvent = (event as ClipboardEvent)
    if (pasteEvent != null && pasteEvent.clipboardData) {
      let paste = pasteEvent.clipboardData.getData('text');
      let line: String = this.code[this.cursorLine]
      this.code[this.cursorLine] = line.substring(0, this.cursorChar) + paste + line.substring(this.cursorChar)
      this.cursorChar += paste.length
    }
  }

  onPress(event: any) {
    let kbEvent: KeyboardEvent = (event as KeyboardEvent);
    if (this.handleHotkey(kbEvent)) { }
    else if (kbEvent.key.length == 1) {
      if (kbEvent.key == "v" && kbEvent.ctrlKey) {
        return true
      }
      let line: String = this.code[this.cursorLine]
      this.code[this.cursorLine] = line.substring(0, this.cursorChar) + kbEvent.key + line.substring(this.cursorChar)
      this.cursorChar++
    } else if (this.handleEnter(kbEvent)) { }
    else if (this.handleBackspace(kbEvent)) { }
    else if (this.handleArrowKeys(kbEvent)) { }
    else {
      console.log(kbEvent.key)
    }

    return false;
  }

}
