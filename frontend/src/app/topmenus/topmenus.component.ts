import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-topmenus',
  templateUrl: './topmenus.component.html',
  styleUrls: ['./topmenus.component.scss']
})
export class TopmenusComponent implements OnInit {

  @Output() runCommand = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

}
