import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeEditorComponent } from "./code-editor/code-editor.component"
import { BlankPageComponent } from "./blank-page/blank-page.component"

const routes: Routes = [
  {
    path: ":projectName", children: [
      { path: "**", component: CodeEditorComponent }
    ]
  },
  { path: "", component: BlankPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
