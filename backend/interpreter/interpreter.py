from antlr4 import *
from .LanguageLexer import LanguageLexer
from .LanguageParser import LanguageParser
from .LanguageVisitor import LanguageVisitor

from . import builtin_funcs
import time

functions = {
    "moveMouse": builtin_funcs.moveMouse,
    "pressKey": builtin_funcs.pressKey,
    "releaseKey": builtin_funcs.releaseKey,
    "pressMouse": builtin_funcs.pressMouse,
    "releaseMouse": builtin_funcs.releaseMouse,
    "tapMouse": builtin_funcs.tapMouse,
    "tapKey": builtin_funcs.tapKey,
    "startRecording": builtin_funcs.startRecording,
    "stopRecording": builtin_funcs.stopRecording,
    "wait": time.sleep,
    "print": builtin_funcs.languagePrint
}

def interpret_function(fileName, functionName):
    with open(fileName) as f:
        code = f.read()
        stream = InputStream(code)
        lexer = LanguageLexer(stream)
        tokens = CommonTokenStream(lexer)
        parser = LanguageParser(tokens)
        tree = parser.entry_point()
        visitor = LanguageVisitor(False)
        visitor.functions = functions
        visitor.visit(tree)
        visitor.evaluateExpression = True
        return visitor.visit(visitor.custom_functions[functionName]["body"])

def interpret_file(fileName):
    with open(fileName) as f:
        return interpret(f.read())

def interpret(text, executeExpressions = True):
    stream = InputStream(text)
    lexer = LanguageLexer(stream)
    tokens = CommonTokenStream(lexer)
    parser = LanguageParser(tokens)
    tree = parser.entry_point()
    visitor = LanguageVisitor(executeExpressions)
    visitor.functions = functions
    output = visitor.visit(tree)
    return output