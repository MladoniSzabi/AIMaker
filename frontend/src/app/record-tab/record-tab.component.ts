import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';

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
  }

  onStopRecordingChanged(event: Event) {
    if(this.stopRecordInput) {
      this.backend.setStopRecordingButton(this.projectName, this.stopRecordInput.nativeElement.value)
    }
  }

  startRecording() {
    this.backend.startRecording()
    this.checkRecordingLoop = setInterval(() => {
      this.backend.isRecordingOver().subscribe((isOver) => {
        if(isOver == "true") {
          clearInterval(this.checkRecordingLoop)
          this.backend.getRecording().subscribe((recording) => {
            console.log(recording)
          })
        }
      })
    }, 500)
  }

}
