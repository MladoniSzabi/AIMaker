import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {

  coord: { x: number, y: number } = { x: 0, y: 0 }
  isShowing: boolean = false;
  image: string = ""
  confirmCallback: (text: string) => void = (text: string) => { }
  cancelCallback: () => void = () => { }

  @ViewChild("coords") coordText: ElementRef<HTMLElement> = {} as ElementRef<HTMLElement>

  constructor(private modalService: ModalService) {
    console.log("called")
    this.modalService.getModalRequests().subscribe({
      next: ({ message, type, onSuccess, onCancel, other }) => {
        if (type == "image") {
          this.image = message
          this.confirmCallback = onSuccess
          this.cancelCallback = onCancel
          this.isShowing = true
        }
      }
    })
  }

  ngOnInit(): void {
  }

  onMouseMove(event: Event) {
    let moveEvent = (event as MouseEvent)
    let target = (moveEvent.target as HTMLImageElement)
    if(target)
    {
      let targetBB = target.getBoundingClientRect()
      this.coord.x = Math.round(((moveEvent.clientX - targetBB.left) / targetBB.width) * target.naturalWidth)
      this.coord.y = Math.round(((moveEvent.clientY - targetBB.top) / targetBB.height) * target.naturalHeight)
    }
  }

  onMouseClick() {
    navigator.clipboard.writeText(String(this.coord.x) + ", " + this.coord.y)
  }

  confirm() {
    this.confirmCallback("")
    this.image = ""
    this.confirmCallback = (text: string) => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }

  cancel() {
    this.cancelCallback()
    this.image = ""
    this.confirmCallback = (text: string) => { }
    this.cancelCallback = () => { }
    this.isShowing = false
  }

  downloadImage() {
    let a = document.createElement("a")
    a.style.visibility = "hidden"
    a.href = this.image
    a.download = this.image
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

}
