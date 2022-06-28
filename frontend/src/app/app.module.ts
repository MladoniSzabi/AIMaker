import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CodeareaComponent } from './codearea/codearea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { TopmenusComponent } from './topmenus/topmenus.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { CodeoutputareaComponent } from './codeoutputarea/codeoutputarea.component';
import { FileListComponent } from './file-list/file-list.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeareaComponent,
    CodeeditorComponent,
    TopmenusComponent,
    CodeoutputareaComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
