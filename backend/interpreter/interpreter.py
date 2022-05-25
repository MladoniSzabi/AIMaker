from tkinter.tix import Tree
from antlr4 import *
from LanguageLexer import LanguageLexer
from LanguageParser import LanguageParser
from LanguageVisitor import LanguageVisitor

def interpret(text):
    print(text)
    stream = InputStream(text)
    lexer = LanguageLexer(stream)
    tokens = CommonTokenStream(lexer)
    parser = LanguageParser(tokens)
    tree = parser.language_file()
    visitor = LanguageVisitor()
    output = visitor.visit(tree)
    print(output)
    print(visitor.variables)
    print(tree.toStringTree())

if __name__ == "__main__":
    import sys
    interpret(" ".join(sys.argv[1:]))