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
import { MatTabsModule } from '@angular/material/tabs';
import { CodeoutputareaComponent } from './codeoutputarea/codeoutputarea.component';
import { FileListComponent } from './file-list/file-list.component';
import { BottomPannelComponent } from './bottom-pannel/bottom-pannel.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeareaComponent,
    CodeeditorComponent,
    TopmenusComponent,
    CodeoutputareaComponent,
    FileListComponent,
    BottomPannelComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
