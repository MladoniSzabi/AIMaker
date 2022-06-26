import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  saveFile(filename: string, content: string) { this.http.post("/api/file/" + filename, content).subscribe() }
  loadfile(filename: string): Observable<string> { return this.http.get("/api/file/" + filename, {responseType: "text"}) }

  runFile(filename: string, content: string): Observable<string[]> {
    if(filename) {
      this.http.post("/api/file/" + filename, content).subscribe()
    }
    let form = new FormData()
    form.append("code", content)
    return this.http.post<string[]>("/api/code/run", form)
  }

  startRecording() { this.http.post("/api/record/start", "").subscribe() }
  stopRecording(): Observable<string[]> { return this.http.post<string[]>("/api/record/stop", "") }
}
