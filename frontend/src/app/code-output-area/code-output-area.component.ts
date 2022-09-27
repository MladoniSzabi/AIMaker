import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  project: string = ""

  constructor(private backend: BackendService, private modalService: ModalService, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe((params) => {
      if(params.has("projectName")) {
        this.project = params.get("projectName")!
      }
    })
    this.backend.getConsoleOutputPipe().subscribe((message) => {
      if(message.type == "string") {
        for(let line of String(message.message).split("\n")) {
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
    this.modalService.createImageModal(imageName, this.project)
  }

}
