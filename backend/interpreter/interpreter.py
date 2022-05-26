from antlr4 import *
from .LanguageLexer import LanguageLexer
from .LanguageParser import LanguageParser
from .LanguageVisitor import LanguageVisitor

from . import builtin_funcs

functions = {
    "moveMouse": builtin_funcs.moveMouse,
    "pressKey": builtin_funcs.pressKey,
    "releaseKey": builtin_funcs.releaseKey,
    "tapKey": builtin_funcs.tapKey,
    "startRecording": builtin_funcs.startRecording,
    "stopRecording": builtin_funcs.stopRecording,
}

def interpret(text):
    stream = InputStream(text)
    lexer = LanguageLexer(stream)
    tokens = CommonTokenStream(lexer)
    parser = LanguageParser(tokens)
    tree = parser.language_file()
    visitor = LanguageVisitor()
    visitor.functions = functions
    output = visitor.visit(tree)
    return output