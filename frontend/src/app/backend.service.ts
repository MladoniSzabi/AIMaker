import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export type FileTree = {name: string, children: [FileTree]}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  saveFile(project: string, filename: string, content: string) { this.http.post("/api/project/" + project + "/file/" + filename, content).subscribe() }
  loadfile(project: string, filename: string): Observable<string> { console.log(project, filename); return this.http.get("/api/project/" + project + "/file/" + filename, {responseType: "text"}) }

  runFile(project: string, filename: string, content: string): Observable<string[]> {
    if(filename) {
      this.http.post("/api/project/" + project + "/file/" + filename, content).subscribe()
    }
    let form = new FormData()
    form.append("code", content)
    return this.http.post<string[]>("/api/code/run", form)
  }

  getFileList(project: string): Observable<[FileTree]> {return this.http.get<[FileTree]>("/api/project/" + project + "/file/list")}

  startRecording() { this.http.post("/api/record/start", "").subscribe() }
  stopRecording(): Observable<string[]> { return this.http.post<string[]>("/api/record/stop", "") }
}
