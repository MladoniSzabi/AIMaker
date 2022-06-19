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

function copyCommand(textEditor: TextEditor): void {
    let selectedText = textEditor.getSelectedText().text.join("\n")
    if (selectedText) {
        navigator.clipboard.writeText(selectedText)
    }
}

function cutCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
    let selectedText = textEditor.getSelectedText()
    let text = textEditor.getText()
    text[selectedText.startPosition.line] = text[selectedText.startPosition.line].substring(selectedText.startPosition.char)
}

function pasteCommand(textEditor: TextEditor, pasteEvent: ClipboardEvent): void {
    let text = textEditor.getText()
    let cursor = textEditor.getCursorPosition()
    if(pasteEvent == null) {
        throw "Paste command must be run with a clipboard event"
    }

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

function openFileCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function closeFileCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function saveCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function saveAllCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function runCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function undoCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function redoCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function findCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function replaceCommand(textEditor: TextEditor): void {
    throw("Function not implemented")
}

function toggleOutputCommand(textEditor: TextEditor): void {

}

const COMMAND_NAME_TO_COMMAND: { [key: string]: (textEditor: TextEditor, ...others: any[]) => void } = {
    "openFileCommand": openFileCommand,
    "closeFileCommand": closeFileCommand,
    "saveCommand": saveCommand,
    "saveAllCommand": saveAllCommand,
    "runCommand": runCommand,
    "cutCommand": cutCommand,
    "copyCommand": copyCommand,
    "pasteCommand": pasteCommand,
    "undoCommand": undoCommand,
    "redoCommand": redoCommand,
    "findCommand": findCommand,
    "replaceCommand": replaceCommand,

    "toggleOutputCommand": toggleOutputCommand,
}

const KEYBINDING_TO_COMMAND_NAME: { [key: string]: string } = {
    "CTRL_O": "openFileCommand",
    "CTRL_W": "closeFileCommand",
    "CTRL_S": "saveCommand",
    "CTRL_SHIFT_S": "saveAllCommand",
    "F11": "runCommand",
    "CTRL_X": "cutCommand",
    "CTRL_C": "copyCommand",
    "CTRL_V": "pasteCommand",
    "CTRL_Z": "undoCommand",
    "CTRL_SHIFT_Z": "redoCommand",
    "CTRL_F": "findCommand",
    "CTRL_H": "replaceCommand",
}

export class KeybindingHandler {
    static handleKeybinding(keybinding: string, textEditor: TextEditor, args?: any[]): boolean {
        console.log(keybinding)
        if (!args) {
            args = []
        }
        if (keybinding in KEYBINDING_TO_COMMAND_NAME) {
            console.assert(KEYBINDING_TO_COMMAND_NAME[keybinding] in COMMAND_NAME_TO_COMMAND, "Keybinding not in command")
            COMMAND_NAME_TO_COMMAND[KEYBINDING_TO_COMMAND_NAME[keybinding]](textEditor, ...args)
            return true
        }
        return false
    }

    static runCommand(commandName: string, textEditor: TextEditor, ...args: any[]): void {
        if (commandName in COMMAND_NAME_TO_COMMAND) {
            COMMAND_NAME_TO_COMMAND[commandName](textEditor, ...args)
        } else {
            throw("Command does not exist")
        }
    }
}