import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRequestSubject = new Subject<{ type: string, onSuccess: (extra?: any) => void, onCancel: () => void, other?: any }>()

  createConfirmModal(message: string, onConfirm: () => void, onCancel: () => void) {
    this.modalRequestSubject.next({ type: "confirm", onSuccess: onConfirm, onCancel, other: { message } })
  }

  getModalRequests() {
    return this.modalRequestSubject
  }

  constructor() {
  }
}
