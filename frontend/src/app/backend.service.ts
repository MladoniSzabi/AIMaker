import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import * as BackendTypes from './types'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  consoleOutput: Subject<string|null> = new Subject()

  saveFile(project: string, filepath: string, content: string) { this.http.post("/api/project/" + project + "/file/" + filepath, content).subscribe() }
  loadfile(project: string, filepath: string): Observable<string> { return this.http.get("/api/project/" + project + "/file/" + filepath, { responseType: "text" }) }

  runFile(project: string, filepath: string, content: string) {
    if (filepath) {
      this.http.post("/api/project/" + project + "/file/" + filepath, content).subscribe()
    }
    let form = new FormData()
    form.append("code", content)
    this.consoleOutput.next(null)
    this.http.post("/api/code/run", form, { responseType: "text" }).subscribe((consoleOutput) => {
      for(let line of consoleOutput.split("\n")) {
        this.consoleOutput.next(line)
      }
    })
  }

  getConsoleOutputPipe(): Subject<string|null> {
    return this.consoleOutput
  }

  getFileList(project: string): Observable<[BackendTypes.FileTree]> { return this.http.get<[BackendTypes.FileTree]>("/api/project/" + project + "/file/list") }

  startRecording() { this.http.post("/api/record/start", "").subscribe() }
  stopRecording(): Observable<string[]> { return this.http.post<string[]>("/api/record/stop", "") }
  setStopRecordingButton(projectName: string, button: string) {
    let form = new FormData()
    form.append("projectName", projectName)
    this.http.post("/api/record/stop/hotkey/" + button, form).subscribe()
  }

  getStopRecordingButton(projectName: string): Observable<string> { return this.http.get("/api/record/stop/hotkey?projectName=" + projectName, { responseType: "text" }) }
  isRecordingOver(): Observable<string> { return this.http.get("/api/record/status", { responseType: "text" }) }
  getRecording(): Observable<BackendTypes.Recording> { return this.http.get<BackendTypes.Recording>("api/record") }

  getMacroList(project: string): Observable<BackendTypes.MacroList> { return this.http.get<BackendTypes.MacroList>("/api/project/" + project + "/keybindings") }
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
  deleteMacro(project: string, index: number) {
    this.http.delete("/api/project/" + project + "/keybindings/" + index.toString()).subscribe()
  }
}
