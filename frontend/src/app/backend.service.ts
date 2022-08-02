import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export type FileTree = { name: string, children: [FileTree] }
export type MacroList = { path: string, keybinding: string }[]

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  saveFile(project: string, filepath: string, content: string) { this.http.post("/api/project/" + project + "/file/" + filepath, content).subscribe() }
  loadfile(project: string, filepath: string): Observable<string> { return this.http.get("/api/project/" + project + "/file/" + filepath, { responseType: "text" }) }

  runFile(project: string, filepath: string, content: string): Observable<string[]> {
    if (filepath) {
      this.http.post("/api/project/" + project + "/file/" + filepath, content).subscribe()
    }
    let form = new FormData()
    form.append("code", content)
    return this.http.post<string[]>("/api/code/run", form)
  }

  getFileList(project: string): Observable<[FileTree]> { return this.http.get<[FileTree]>("/api/project/" + project + "/file/list") }

  startRecording() { this.http.post("/api/record/start", "").subscribe() }
  stopRecording(): Observable<string[]> { return this.http.post<string[]>("/api/record/stop", "") }

  getMacroList(project: string): Observable<MacroList> { return this.http.get<MacroList>("/api/project/" + project + "/keybindings") }
  makeNewMacro(project: string, path: string, keybinding: string) {
    let form = new FormData()
    form.append("path", path)
    form.append("keybinding", keybinding)

    this.http.put("/api/project/" + project + "/keybindings", form).subscribe()
  }
  editMacro(project: string, index: number, path: string, keybinding: string) {
    let form = new FormData()
    form.append("path", path)
    form.append("keybinding", keybinding)
    form.append("index", String(index))

    this.http.post("/api/project/" + project + "/keybindings", form).subscribe()
  }
}
