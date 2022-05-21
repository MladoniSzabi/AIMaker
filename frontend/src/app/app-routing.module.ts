import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//TODO:Debug
import { CodeareaComponent } from "./codearea/codearea.component"

const routes: Routes = [
  {path: "debug", component: CodeareaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
