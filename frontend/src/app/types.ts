type KeyboardEvent = { name: string, scan_code: number, timestamp: number, device: "keyboard", type: "down"|"up"}
type MousePressEvent = { device: "mouse", type: "down"|"up", x: number, y: number, timestamp: number, button: string}
type MouseMoveEvent = { device: "mouse", type: "move", x: number, y: number}
type MouseWheelEvent = { device: "mouse", type: "wheel", delta: number, timestamp: number}

export type FileTree = { name: string, children: [FileTree] }
export type MacroList = { path: string, keybinding: string }[]
export type Recording = (KeyboardEvent|MousePressEvent|MouseMoveEvent|MouseWheelEvent)[]
export type ConsoleOutput = {type: "string", message: string}