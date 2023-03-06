import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as ace from "ace-builds"
import { ActivatedRoute, Router } from '@angular/router';
import { TextEditor } from '../keybindings';
import { Title } from '@angular/platform-browser';
import { BackendService } from '../backend.service'
import { combineLatest } from 'rxjs';

@Component({
    selector: 'app-code-area',
    templateUrl: './code-area.component.html',
    styleUrls: ['./code-area.component.scss']
})
export class CodeAreaComponent implements AfterViewInit, TextEditor {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private backendService: BackendService) { }

    getText(): string {
        return this.aceEditor.getValue()
    }
    getLine(lineNumber: number): string {
        return this.aceEditor.getValue().split("\n")[lineNumber]
    }
    getSelectedText(): string {
        return this.aceEditor.getSelectedText()
    }
    getCursorPosition(): { line: number; char: number; } {
        let pos = this.aceEditor.getCursorPosition()
        return {
            line: pos.row,
            char: pos.column
        }
    }
    setCursorPosition(position: { line: number; char: number; }): void {
        this.aceEditor.moveCursorTo(position.line, position.char)
    }
    insert(text: string, position?: { line: number; char: number; }): string[] {
        if (position) {
            this.aceEditor.moveCursorTo(position.line, position.char)
        }
        this.aceEditor.insert(text)
        throw new Error('Method not implemented.');
    }
    getFileName(): string {
        return this.fileName
    }
    getProjectName(): string {
        return this.projectName
    }
    navigate(path: string[]): void {
        this.router.navigate(path)
    }

    fileName: string = ""
    projectName: string = ""

    @ViewChild("editor")
    private editorElement!: ElementRef<HTMLElement>;

    private aceEditor!: ace.Ace.Editor;

    ngAfterViewInit(): void {
        this.aceEditor = ace.edit(this.editorElement.nativeElement)
        this.aceEditor.session.setMode("ace/mode/javascript");
        this.aceEditor.session.setMode("")
        combineLatest([this.activatedRoute.url, this.activatedRoute.paramMap]).subscribe(forkResult => {
            let [urlsegment, params] = forkResult
            this.fileName = urlsegment.join("/")
            if (this.fileName && params.get("projectName")) {
                this.projectName = params.get("projectName") || ""
                this.titleService.setTitle(params.get("projectName") + " - " + urlsegment[urlsegment.length - 1])
                this.backendService.loadfile(this.projectName, this.fileName).subscribe((retval) => {
                    this.aceEditor.setValue(retval)
                    this.aceEditor.moveCursorTo(0, 0)
                })
            } else {
                this.fileName = "New File"
                this.titleService.setTitle("New File")
            }
        })
    }
}
