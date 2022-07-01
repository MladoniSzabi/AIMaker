import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO:Debug
import { CodeeditorComponent } from "./codeeditor/codeeditor.component"

const routes: Routes = [
  {path: ":projectName",  children: [
    {path:"**", component: CodeeditorComponent}
  ]},
  {path: "debug", component: CodeeditorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
