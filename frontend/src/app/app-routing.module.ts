import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO:Debug
import { CodeEditorComponent } from "./code-editor/code-editor.component"

const routes: Routes = [
  {
    path: ":projectName", children: [
      { path: "**", component: CodeEditorComponent }
    ]
  },
  { path: "debug", component: CodeEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
