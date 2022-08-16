import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-root',
  templateUrl: './modal-root.component.html',
  styleUrls: ['./modal-root.component.scss']
})
export class ModalRootComponent implements OnInit {

  @Input() isShowing: boolean = false
  @Output() cancel: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancel.emit()
  }

  noCancel(event: Event) {
    event.stopPropagation()
  }

}
