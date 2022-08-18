import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ModalService } from '../modal.service';
import { ConsoleOutput } from '../types';

@Component({
  selector: 'app-code-output-area',
  templateUrl: './code-output-area.component.html',
  styleUrls: ['./code-output-area.component.scss']
})
export class CodeOutputAreaComponent implements OnInit {

  console: ConsoleOutput[] = []

  constructor(private backend: BackendService, private modalService: ModalService) {
    this.backend.getConsoleOutputPipe().subscribe((message) => {
      if(message.type == "string") {
        for(let line of message.message.split("\n")) {
          this.console.push({type: "string", message: line})
        }
      } else if(message.type == "image") {
        this.console.push(message)
      }
    })
  }

  ngOnInit(): void {
  }

  clearConsole() {
    this.console = []
  }

  openImage(imageName: string) {
    this.modalService.createImageModal(imageName)
  }

}
