import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: HttpClient) { }

  saveFile(filename: string, content: string) { this.http.post("/api/file", content) }
  loadfile(filename: string): Observable<string> { return this.http.get<string>("/api/file") }

  runFile(filename: string, content: string): Observable<string[]> { this.http.post("/api/file", content); return this.http.post<string[]>("/api/code/run", content) }

  startRecording() { this.http.post("/api/record/start", "") }
  stopRecording() { this.http.post("/api/record/stop", "") }
}
