import sys
import os
from interpreter import interpreter
from interpreter import builtin_funcs
import json
import time

def loadSingleMacro(macroEntry, macrosDir):
    if ":" in macroEntry["path"]:
        print(macroEntry)
        colonPos = macroEntry["path"].find(":")
        functionName = macroEntry["path"][(colonPos+1):]
        fileName = macroEntry["path"][:colonPos]
        if os.path.exists(os.path.join(macrosDir, fileName)):
            def macroCallback():
                print(2)
                interpreter.interpret_function(os.path.join(macrosDir, fileName), functionName)
            builtin_funcs.registerKeybinding(macroEntry["keybinding"], macroCallback)
        elif os.path.exists(os.path.join(macrosDir, "files", fileName)):
            print(macrosDir, fileName, functionName)
            def macroCallback():
                print(macrosDir, fileName, functionName)
                interpreter.interpret_function(os.path.join(macrosDir, "files", fileName), functionName)
            builtin_funcs.registerKeybinding(macroEntry["keybinding"], macroCallback)
    else:
        if os.path.exists(os.path.join(macrosDir, macroEntry["path"])):
            def macroCallback():
                interpreter.interpret_file(os.path.join(macrosDir, macroEntry["path"]))
            builtin_funcs.registerKeybinding(macroEntry["keybinding"], macroCallback)
        elif os.path.exists(os.path.join(macrosDir, "files", macroEntry["path"])):
            def macroCallback():
                interpreter.interpret_file(os.path.join(macrosDir, "files", macroEntry["path"]))
            builtin_funcs.registerKeybinding(macroEntry["keybinding"], macroCallback)


def loadMacros(macrosFile):
    with open(macrosFile) as f:
        macros = json.loads(f.read())
        macrosDir = os.path.split(macrosFile)[0]
        for macroEntry in macros:
            loadSingleMacro(macroEntry, macrosDir)
    
    while 1:
        time.sleep(1)

def printHelp():
    print("Specify one of: ")
    print(" run")
    print(" loadHotkeys")

def main():
    builtin_funcs.onPrint = lambda x: 1
    if len(sys.argv) == 1:
        printHelp()
        return
    
    if sys.argv[1] == "run":
        if len(sys.argv) < 3:
            print("You must specify a file")
            return
        
        if not os.path.exists(sys.argv[2]):
            print("File does not exist")
            return
        
        interpreter.interpret_file(sys.argv[2])
    elif sys.argv[1] == "loadHotkeys":
        if len(sys.argv) < 3:
            print("You must specify a script and a json file")
            return
        
        if not os.path.exists(sys.argv[2]):
            print("The JSON file does not exist")
            return
        
        loadMacros(sys.argv[2])
    else:
        print("Command " + sys.argv[1] + " was not recognised")
        printHelp()


if __name__ == "__main__":
    main()