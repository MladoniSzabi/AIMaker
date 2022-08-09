import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalRequestSubject = new Subject<{ message: string, type: string, onSuccess: (extra?: any) => void, onCancel: () => void, other?: any }>()

  createConfirmModal(message: string, onConfirm: () => void, onCancel: () => void) {
    this.modalRequestSubject.next({ type: "confirm", onSuccess: onConfirm, onCancel, message })
  }

  createInputModal(message: string, onConfirm: (text:string) => void, onCancel: () => void) {
    this.modalRequestSubject.next({ type: "input", onSuccess: onConfirm, onCancel, message })
  }

  getModalRequests() {
    return this.modalRequestSubject
  }

  constructor() {
  }
}
