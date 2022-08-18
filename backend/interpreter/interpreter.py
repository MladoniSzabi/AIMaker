from antlr4 import *
from .LanguageLexer import LanguageLexer
from .LanguageParser import LanguageParser
from .LanguageVisitor import LanguageVisitor

from . import builtin_funcs
import time
from . import image_processing

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
    "print": builtin_funcs.languagePrint,
    "printImage": image_processing.printImage,
    "takeScreenshot": image_processing.takeScreenshot,
    "saveImage": image_processing.saveImage,
    "loadImage": image_processing.loadImage,
    "imageToText": image_processing.imageToText,
    "imageToBlackAndWhite": image_processing.imageToBlackAndWhite,
    "blurImage": image_processing.blurImage,
    "getAveragePixel": image_processing.getAveragePixel,
    "getImageWidth": image_processing.getImageWidth,
    "getImageHeight": image_processing.getImageHeight,
    "compareImages": image_processing.compareImages
}

def interpret_function(fileName, functionName, projectName=None):
    print(projectName)
    with open(fileName) as f:
        code = f.read()
        stream = InputStream(code)
        lexer = LanguageLexer(stream)
        tokens = CommonTokenStream(lexer)
        parser = LanguageParser(tokens)
        tree = parser.entry_point()
        visitor = LanguageVisitor(False)
        visitor.functions = functions
        visitor.functionContext = {
            "projectName": projectName
        }
        visitor.visit(tree)
        visitor.evaluateExpression = True
        return visitor.visit(visitor.custom_functions[functionName]["body"])

def interpret_file(fileName, projectName=None):
    with open(fileName) as f:
        return interpret(f.read(), projectName=projectName)

def interpret(text, executeExpressions = True, projectName=None):
    stream = InputStream(text)
    lexer = LanguageLexer(stream)
    tokens = CommonTokenStream(lexer)
    parser = LanguageParser(tokens)
    tree = parser.entry_point()
    visitor = LanguageVisitor(executeExpressions)
    visitor.functions = functions
    visitor.functionContext = {
        "projectName": projectName
    }
    output = visitor.visit(tree)
    return output