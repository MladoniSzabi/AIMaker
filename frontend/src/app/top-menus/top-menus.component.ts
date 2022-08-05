import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-menus',
  templateUrl: './top-menus.component.html',
  styleUrls: ['./top-menus.component.scss']
})
export class TopMenusComponent implements OnInit {

  @Output() runCommand = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
