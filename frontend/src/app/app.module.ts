import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CodeAreaComponent } from './code-area/code-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { TopMenusComponent } from './top-menus/top-menus.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CodeOutputAreaComponent } from './code-output-area/code-output-area.component';
import { FileListComponent } from './file-list/file-list.component';
import { BottomPannelComponent } from './bottom-pannel/bottom-pannel.component';
import { MacroPanelComponent } from './macro-panel/macro-panel.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { RecordTabComponent } from './record-tab/record-tab.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ModalInputComponent } from './modal-input/modal-input.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const socketIOConfig: SocketIoConfig = {url: "http://localhost:5000", options: {}}

@NgModule({
  declarations: [
    AppComponent,
    CodeAreaComponent,
    CodeEditorComponent,
    TopMenusComponent,
    CodeOutputAreaComponent,
    FileListComponent,
    BottomPannelComponent,
    MacroPanelComponent,
    ModalConfirmComponent,
    RecordTabComponent,
    BlankPageComponent,
    ModalInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
    MatTabsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketIOConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
