import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeareaComponent } from './codearea/codearea.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
import { TopmenusComponent } from './topmenus/topmenus.component'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { CodeoutputareaComponent } from './codeoutputarea/codeoutputarea.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeareaComponent,
    CodeeditorComponent,
    TopmenusComponent,
    CodeoutputareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
