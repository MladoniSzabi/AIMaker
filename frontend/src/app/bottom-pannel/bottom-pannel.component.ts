import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bottom-pannel',
  templateUrl: './bottom-pannel.component.html',
  styleUrls: ['./bottom-pannel.component.scss']
})
export class BottomPannelComponent implements OnInit {

  constructor() { }

  @Output() recorded: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
  }

  onRecorded(event: string) {
    this.recorded.emit(event)
  }

}
