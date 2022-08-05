import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service'

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  isShowing: boolean = false;
  message: string = ""
  confirmCallback: () => void = () => { }
  cancelCallback: () => void = () => { }

  constructor(private modalService: ModalService) {
    this.modalService.getModalRequests().subscribe({
      next: ({ type, onSuccess, onCancel, other }) => {
        if (type == "confirm") {
          this.message = other.message
          this.confirmCallback = onSuccess
          this.cancelCallback = onCancel
          this.isShowing = true
        }
      }
    })
  }

  ngOnInit(): void {
  }

  confirm() {
    this.confirmCallback()
    this.message = ""
    this.confirmCallback = () => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }

  cancel() {
    this.cancelCallback()
    this.message = ""
    this.confirmCallback = () => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }

}
