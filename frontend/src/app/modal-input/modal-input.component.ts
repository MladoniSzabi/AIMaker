import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.scss']
})
export class ModalInputComponent implements OnInit {

  isShowing: boolean = false;
  message: string = ""
  confirmCallback: (text: string) => void = (text:string) => { }
  cancelCallback: () => void = () => { }

  @ViewChild("input") modalInputField: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>

  constructor(private modalService: ModalService) {
    this.modalService.getModalRequests().subscribe({
      next: ({ message, type, onSuccess, onCancel, other }) => {
        if (type == "input") {
          this.message = message
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
    this.confirmCallback(this.modalInputField.nativeElement.value)
    this.message = ""
    this.confirmCallback = (text:string) => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }

  cancel() {
    this.cancelCallback()
    this.message = ""
    this.confirmCallback = (text:string) => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }
}
