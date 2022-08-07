import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Recording } from '../types';

@Component({
  selector: 'app-record-tab',
  templateUrl: './record-tab.component.html',
  styleUrls: ['./record-tab.component.scss']
})
export class RecordTabComponent implements OnInit {

  @ViewChild('stopRecordingButtonInput') stopRecordInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;
  @ViewChild('functionNameInput') functionNameInput: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  projectName: string = ""
  checkRecordingLoop!: ReturnType<typeof setInterval>

  @Output() recorded: EventEmitter<string> = new EventEmitter()

  constructor(private backend: BackendService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params) => {
      let projectName = params.get("projectName")
      if (!projectName) {
        return
      }
      this.projectName = projectName
    })
  }

  ngOnInit(): void {
    this.backend.getStopRecordingButton(this.projectName).subscribe((buttonName) => {
      this.stopRecordInput.nativeElement.value = buttonName
    })
  }

  onStopRecordingChanged(event: Event) {
    if (this.stopRecordInput) {
      this.backend.setStopRecordingButton(this.projectName, this.stopRecordInput.nativeElement.value)
    }
  }

  writeFunction(recording: Recording) {
    let functionName = this.functionNameInput.nativeElement.value || "new_recording"
    let functionText = "function " + functionName + "() {\n\t"
    for(let record of recording) {
      if(record.device == "mouse") {
        if(record.type == "move") {
          functionText += "moveMouse(" + record.x + ", " + record.y + ")\n\t"
        } else if(record.type == "down") {
          functionText += "tapMouse(" + record.button + ")\n\t"
        }
      } else if(record.device == "keyboard") {
        if(record.type == "down") {
          functionText += "tapKey( '" + record.name + "' )\n\t"
        }
      }
    }

    functionText += "\n}\n\n"

    this.recorded.emit(functionText)
  }

  startRecording() {
    this.backend.startRecording()
    this.checkRecordingLoop = setInterval(() => {
      this.backend.isRecordingOver().subscribe((isRecording) => {
        if (isRecording.toLocaleLowerCase() == "false") {
          clearInterval(this.checkRecordingLoop)
          this.backend.getRecording().subscribe((recording) => {
            this.writeFunction(recording)
          })
        }
      })
    }, 500)
  }

}
