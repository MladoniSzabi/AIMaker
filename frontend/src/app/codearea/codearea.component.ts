import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codearea',
  templateUrl: './codearea.component.html',
  styleUrls: ['./codearea.component.scss']
})
export class CodeareaComponent implements OnInit {

  code: String[] = ["asdkjashdkfjakshkjaskjdfh", "dsa"]

  cursorLine: number = 0
  cursorChar: number = 0

  previousCharPos: number = 0

  specialKeyStatus = {
    "ctrl": false,
    "shift": false,
    "alt": false
  }

  constructor() { }

  ngOnInit(): void {
    this.cursorLine = this.code.length-1;
    this.cursorChar = this.code[this.cursorLine].length
    this.previousCharPos = this.cursorChar
  }

  onPress(event: any) {
    let kbEvent: KeyboardEvent = (event as KeyboardEvent);
    if(kbEvent.key.length == 1) {
      let line:String = this.code[this.cursorLine]
      this.code[this.cursorLine] = line.substring(0, this.cursorChar) + kbEvent.key + line.substring(this.cursorChar)
      this.cursorChar++
    } else if(kbEvent.key == "Backspace") {
      if(this.cursorChar > 0) {
        let line:String = this.code[this.cursorLine]
        this.code[this.cursorLine] = line.substring(0, this.cursorChar-1) + line.substring(this.cursorChar)
        this.cursorChar--
      }
    } else if(kbEvent.key == "ArrowLeft") {
      console.log(this.previousCharPos)
      this.cursorChar--
      if(this.cursorChar < 0) {
        if(this.cursorLine > 0) {
          this.cursorLine--;
          this.cursorChar = this.code[this.cursorLine].length
        }
        else {
          this.cursorChar = 0
        }
      }
      this.previousCharPos = this.cursorChar
    } else if(kbEvent.key == "ArrowRight") {
      this.cursorChar++
      if(this.cursorChar > this.code[this.cursorLine].length) {
        if(this.cursorLine < this.code.length-1) {
          this.cursorChar = 0;
          this.cursorLine++;
        } else {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
      this.previousCharPos = this.cursorChar
    } else if(kbEvent.key == "ArrowUp") {
      this.cursorLine--
      if(this.cursorLine < 0) {
        this.cursorLine = 0
        this.cursorChar = 0
      } else {
        this.cursorChar = this.previousCharPos
        if(this.cursorChar > this.code[this.cursorLine].length) {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
    } else if(kbEvent.key == "ArrowDown") {
      this.cursorLine++
      if(this.cursorLine >= this.code.length) {
        this.cursorLine = this.code.length-1
        this.cursorChar = this.code[this.cursorLine].length
      } else {
        this.cursorChar = this.previousCharPos
        if(this.cursorChar > this.code[this.cursorLine].length) {
          this.cursorChar = this.code[this.cursorLine].length
        }
      }
    } else {
      console.log(kbEvent.key)
      return true;
    }

    return false;
  }

}
