export type selectedTextDict = {
    startPosition: { line: number, char: number },
    endPosition: { line: number, char: number },
    text: string[]
}

export interface TextEditor {
    getText(): string[];
    getLine(lineNumber: number): string;
    getSelectedText(): selectedTextDict;
    getCursorPosition(): { line: number, char: number };
    setCursorPosition(position: { line: number, char: number }): void;
    addLine(text: string, lineNumber: number): string[]
}

export function copyCommand(textEditor: TextEditor): void {
    let selectedText = textEditor.getSelectedText().text.join("\n")
    if (selectedText) {
        navigator.clipboard.writeText(selectedText)
    }
}

export function cutCommand(textEditor: TextEditor): void {
    let selectedText = textEditor.getSelectedText()
    let text = textEditor.getText()
    text[selectedText.startPosition.line] = text[selectedText.startPosition.line].substring(selectedText.startPosition.char)
}

export function pasteCommand(textEditor: TextEditor, pasteEvent: ClipboardEvent): void {
    let text = textEditor.getText()
    let cursor = textEditor.getCursorPosition()
    if (pasteEvent != null && pasteEvent.clipboardData) {
        let paste = pasteEvent.clipboardData.getData('text');
        let pasteLines: string[] = paste.split("\n")
        let line: string = text[cursor.line]
        if (pasteLines.length == 1) {
            text[cursor.line] = line.substring(0, cursor.char) + pasteLines[0] + line.substring(cursor.char, text[cursor.line].length)
            cursor.char += pasteLines[0].length
        } else {
            text[cursor.line] = line.substring(0, cursor.char) + pasteLines[0]
            textEditor.addLine(pasteLines[pasteLines.length - 1] + line.substring(cursor.char, text[cursor.line].length), cursor.line + 1)
            for (let i = pasteLines.length - 2; i > 0; i--) {
                textEditor.addLine(pasteLines[i], cursor.line + 1)
            }
            cursor.char = pasteLines[pasteLines.length - 1].length
            cursor.line += pasteLines.length - 1
        }
        textEditor.setCursorPosition(cursor)
    }
}

export function openFileCommand(textEditor: TextEditor): void {
}

export function closeFileCommand(textEditor: TextEditor): void {
}

export function saveCommand(textEditor: TextEditor): void {
}

export function saveAllCommand(textEditor: TextEditor): void {
}

export function runCommand(textEditor: TextEditor): void {
}

export function undoCommand(textEditor: TextEditor): void {
}

export function redoCommand(textEditor: TextEditor): void {
}

export function findCommand(textEditor: TextEditor): void {
}

export function replaceCommand(textEditor: TextEditor): void {
}

const KEYBINDING_TO_COMMAND: { [key: string]: (textEditor: TextEditor, ...others: any[]) => void } = {
    "CTRL_O": openFileCommand,
    "CTRL_W": closeFileCommand,
    "CTRL_S": saveCommand,
    "CTRL_SHIFT_S": saveAllCommand,
    "F11": runCommand,
    "CTRL_X": cutCommand,
    "CTRL_C": copyCommand,
    "CTRL_V": pasteCommand,
    "CTRL_Z": undoCommand,
    "CTRL_SHIFT_Z": redoCommand,
    "CTRL_F": findCommand,
    "CTRL_H": replaceCommand,
}

export class KeybindingHandler {
    static handleKeybinding(keybinding: string, textEditor: TextEditor, args?: any[]): boolean {
        console.log(keybinding)
        if (!args) {
            args = []
        }
        if (keybinding in KEYBINDING_TO_COMMAND) {
            KEYBINDING_TO_COMMAND[keybinding](textEditor, ...args)
            return true
        }
        return false
    }
}

export { KEYBINDING_TO_COMMAND }