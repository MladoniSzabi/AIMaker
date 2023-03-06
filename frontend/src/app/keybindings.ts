import { Router } from "@angular/router";
import { BackendService } from "./backend.service";

export type selectedTextDict = {
    startPosition: { line: number, char: number },
    endPosition: { line: number, char: number },
    text: string[]
}

export interface TextEditor {
    getText(): string
    getLine(lineNumber: number): string
    getSelectedText(): string
    getCursorPosition(): { line: number, char: number }
    setCursorPosition(position: { line: number, char: number }): void
    insert(text: string, position?: { line: number, char: number }): string[]
    getFileName(): string
    getProjectName(): string
    navigate(path: string[]): void
}

function copyCommand(textEditor: TextEditor, backendService: BackendService): void {

    let selectedText = textEditor.getSelectedText()
    if (selectedText) {
        navigator.clipboard.writeText(selectedText)
    }
}

function cutCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
    // let selectedText = textEditor.getSelectedText()
    // let text = textEditor.getText()
    // text[selectedText.startPosition.line] = text[selectedText.startPosition.line].substring(selectedText.startPosition.char)
}

function pasteCommand(textEditor: TextEditor, backendService: BackendService, pasteEvent: ClipboardEvent): void {
    if (pasteEvent == null) {
        throw "Paste command must be run with a clipboard event"
    }

    if (pasteEvent != null && pasteEvent.clipboardData) {
        let paste = pasteEvent.clipboardData.getData('text');
        textEditor.insert(paste)
    }
}

function openFileCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function closeFileCommand(textEditor: TextEditor, backendService: BackendService): void {
    backendService.closeProject(textEditor.getProjectName())
    textEditor.navigate([""])
}

function saveCommand(textEditor: TextEditor, backendService: BackendService): void {
    backendService.saveFile(textEditor.getProjectName(), textEditor.getFileName(), textEditor.getText())
}

function saveAllCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function runCodeCommand(textEditor: TextEditor, backendService: BackendService): void {
    console.log("2")
    backendService.runFile(textEditor.getProjectName(), textEditor.getFileName(), textEditor.getText())
    console.log("3")
}

function undoCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function redoCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function findCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function replaceCommand(textEditor: TextEditor, backendService: BackendService): void {
    throw ("Function not implemented")
}

function toggleOutputCommand(textEditor: TextEditor, backendService: BackendService): void {

}

function moveToStartLine(textEditor: TextEditor, backendService: BackendService): void {
    let cursorPos = textEditor.getCursorPosition()
    textEditor.setCursorPosition({ line: cursorPos.line, char: 0 })
}

function moveToEndLine(textEditor: TextEditor, backendService: BackendService): void {
    let cursorPos = textEditor.getCursorPosition()
    textEditor.setCursorPosition({ line: cursorPos.line, char: textEditor.getText()[cursorPos.line].length })
}

function moveToStartFile(textEditor: TextEditor, backendService: BackendService): void {
    textEditor.setCursorPosition({ line: 0, char: 0 })
}

function moveToEndFile(textEditor: TextEditor, backendService: BackendService): void {
    let lastLine = textEditor.getText().length - 1
    let lastChar = textEditor.getText()[lastLine].length
    textEditor.setCursorPosition({ line: lastLine, char: lastChar })
}

const COMMAND_NAME_TO_COMMAND: { [key: string]: (textEditor: TextEditor, backendService: BackendService, ...others: any[]) => void } = {
    "openFileCommand": openFileCommand,
    "closeFileCommand": closeFileCommand,
    "saveCommand": saveCommand,
    "saveAllCommand": saveAllCommand,
    "runCodeCommand": runCodeCommand,
    "cutCommand": cutCommand,
    "copyCommand": copyCommand,
    "pasteCommand": pasteCommand,
    "undoCommand": undoCommand,
    "redoCommand": redoCommand,
    "findCommand": findCommand,
    "replaceCommand": replaceCommand,
    "moveToStartLineCommand": moveToStartLine,
    "moveToEndLineCommand": moveToEndLine,
    "moveToStartFileCommand": moveToStartFile,
    "moveToEndFileCommand": moveToEndFile,

    "toggleOutputCommand": toggleOutputCommand,
}

const KEYBINDING_TO_COMMAND_NAME: { [key: string]: string } = {
    "CTRL_O": "openFileCommand",
    "CTRL_W": "closeFileCommand",
    "CTRL_S": "saveCommand",
    "CTRL_SHIFT_S": "saveAllCommand",
    "F11": "runCodeCommand",
    "CTRL_X": "cutCommand",
    "CTRL_C": "copyCommand",
    "CTRL_V": "pasteCommand",
    "CTRL_Z": "undoCommand",
    "CTRL_SHIFT_Z": "redoCommand",
    "CTRL_F": "findCommand",
    "CTRL_H": "replaceCommand",
    "END": "moveToEndLineCommand",
    "HOME": "moveToStartLineCommand",
    "CTRL_END": "moveToEndFileCommand",
    "CTRL_HOME": "moveToStartFileCommand",
}

export class KeybindingHandler {

    static eventToString(kbEvent: KeyboardEvent): string {
        let retval =
            (kbEvent.ctrlKey ? "CTRL_" : "") +
            (kbEvent.altKey ? "ALT_" : "") +
            (kbEvent.shiftKey ? "SHIFT_" : "") +
            kbEvent.key.toUpperCase()
        return retval
    }

    static handleKeybinding(keybinding: string, textEditor: TextEditor, backendService: BackendService, args?: any[]): boolean {
        if (!args) {
            args = []
        }
        if (keybinding in KEYBINDING_TO_COMMAND_NAME) {
            console.assert(KEYBINDING_TO_COMMAND_NAME[keybinding] in COMMAND_NAME_TO_COMMAND, "Keybinding not in command")
            COMMAND_NAME_TO_COMMAND[KEYBINDING_TO_COMMAND_NAME[keybinding]](textEditor, backendService, ...args)
            return true
        }
        return false
    }

    static runCommand(commandName: string, textEditor: TextEditor, backendService: BackendService, ...args: any[]): void {
        if (commandName in COMMAND_NAME_TO_COMMAND) {
            COMMAND_NAME_TO_COMMAND[commandName](textEditor, backendService, ...args)
        } else {
            throw ("Command does not exist")
        }
    }
}