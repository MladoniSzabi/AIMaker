import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-codeeditor',
  templateUrl: './codeeditor.component.html',
  styleUrls: ['./codeeditor.component.scss']
})
export class CodeeditorComponent implements AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav = {} as MatSidenav;

  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.sidenav)
    this.sidenav.open()
  }


}
