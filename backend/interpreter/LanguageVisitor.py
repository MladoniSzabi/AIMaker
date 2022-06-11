# Generated from Language.g4 by ANTLR 4.10.1
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .LanguageParser import LanguageParser
else:
    from LanguageParser import LanguageParser

# This class defines a complete generic visitor for a parse tree produced by LanguageParser.

class LanguageVisitor(ParseTreeVisitor):

    def __init__(self):
        super().__init__()
        self.custom_functions = {}
        self.context = [{}]
        self.functions = {}

    # Visit a parse tree produced by LanguageParser#Entry.
    def visitEntry(self, ctx:LanguageParser.EntryContext):
        return self.visit(ctx.exps)

    # Visit a parse tree produced by LanguageParser#Last_Expression.
    def visitLast_Expression(self, ctx:LanguageParser.Last_ExpressionContext):
        return self.visit(ctx.exp)


    # Visit a parse tree produced by LanguageParser#More_Expressions.
    def visitMore_Expressions(self, ctx:LanguageParser.More_ExpressionsContext):
        self.visit(ctx.rest)
        return self.visit(ctx.exp)
    

    # Visit a parse tree produced by LanguageParser#Function_Declaration_Block.
    def visitFunction_Declaration_Block(self, ctx:LanguageParser.Function_Declaration_BlockContext):
        return self.visit(ctx.declaration)


    # Visit a parse tree produced by LanguageParser#Function_Declaration_With_Args.
    def visitFunction_Declaration_With_Args(self, ctx:LanguageParser.Function_Declaration_With_ArgsContext):
        arguments = self.visit(ctx.arglist)
        arguments = list(map(lambda x: x.getText(), arguments))
        self.custom_functions[ctx.functionname.text] = {
            "body": ctx.exprs,
            "arguments": arguments
        }
        return ctx.exprs


    # Visit a parse tree produced by LanguageParser#Function_Declaration.
    def visitFunction_Declaration_Without_Args(self, ctx:LanguageParser.Function_Declaration_Without_ArgsContext):
        self.custom_functions[ctx.functionname.text] = {
            "body": ctx.exprs,
            "arguments": []
        }
        return ctx.exprs


    # Visit a parse tree produced by LanguageParser#String_Literal.
    def visitString_Literal(self, ctx:LanguageParser.String_LiteralContext):
        return ctx.getText()[1:-1]


    # Visit a parse tree produced by LanguageParser#Bool_Literal.
    def visitBool_Literal(self, ctx:LanguageParser.Bool_LiteralContext):
        return True if ctx.getText() == "true" else False


    # Visit a parse tree produced by LanguageParser#Int_Literal.
    def visitInt_Literal(self, ctx:LanguageParser.Int_LiteralContext):
        return int(ctx.getText())


    # Visit a parse tree produced by LanguageParser#Float_Literal.
    def visitFloat_Literal(self, ctx:LanguageParser.Float_LiteralContext):
        return float(ctx.getText())


    # Visit a parse tree produced by LanguageParser#Variable.
    def visitVariable(self, ctx:LanguageParser.VariableContext):
        varName = ctx.getText()
        contextNum = None
        for i, context in reversed(list(enumerate(self.context))):
            if varName in context:
                contextNum = i
                break;
        if contextNum is None:
            raise Exception("Variable " + varName + " is not defined")
        else:
            return self.context[contextNum][varName]


    # Visit a parse tree produced by LanguageParser#Simple_Expression.
    def visitSimple_Expression(self, ctx:LanguageParser.Simple_ExpressionContext):
        return self.visit(ctx.exp)


    # Visit a parse tree produced by LanguageParser#Division.
    def visitDivision(self, ctx:LanguageParser.DivisionContext):
        return self.visit(ctx.lhs) / self.visit(ctx.rhs)


    # Visit a parse tree produced by LanguageParser#Multiplication.
    def visitMultiplication(self, ctx:LanguageParser.MultiplicationContext):
        return self.visit(ctx.lhs) * self.visit(ctx.rhs)


    # Visit a parse tree produced by LanguageParser#Addition.
    def visitAddition(self, ctx:LanguageParser.AdditionContext):
        return self.visit(ctx.lhs) + self.visit(ctx.rhs)


    # Visit a parse tree produced by LanguageParser#Subtraction.
    def visitSubtraction(self, ctx:LanguageParser.SubtractionContext):
        return self.visit(ctx.lhs) - self.visit(ctx.rhs)
    

    # Visit a parse tree produced by LanguageParser#Expression_Assignment.
    def visitExpression_Assignment(self, ctx:LanguageParser.Expression_AssignmentContext):
        variableName = ctx.lhs.text
        self.context[-1][variableName] = self.visit(ctx.rhs)
        return self.context[-1][variableName]


    # Visit a parse tree produced by LanguageParser#Function_Call.
    def visitFunction_Call(self, ctx:LanguageParser.Function_CallContext):
        functionName = ctx.function.text
        if functionName in self.functions:
            return self.functions[functionName]()
        elif functionName in self.custom_functions:
            return self.visit(self.custom_functions[functionName]["body"])
        else:
            raise Exception("Function " + functionName + " is not defined")


    # Visit a parse tree produced by LanguageParser#Function_Call_With_Args.
    def visitFunction_Call_With_Args(self, ctx:LanguageParser.Function_Call_With_ArgsContext):
        args = self.visit(ctx.args)
        functionName = ctx.function.text
        if functionName in self.functions:
            args = list(map(lambda x: self.visit(x), args))
            return self.functions[functionName](*args)
        elif functionName in self.custom_functions:
            newContext = {}
            args = self.visit(ctx.args)
            for i in range(len(args)):
                newContext[self.custom_functions[functionName]["arguments"][i]] = self.visit(args[i])
            self.context.append(newContext)
            retval = self.visit(self.custom_functions[functionName]["body"])
            self.context.pop()
            return retval
        else:
            raise Exception("Function " + functionName + " is not defined")


    # Visit a parse tree produced by LanguageParser#Arg_List.
    def visitArg_List(self, ctx:LanguageParser.Arg_ListContext):
        other_args = self.visit(ctx.other_args)
        new_arg = ctx.arg
        return [*other_args, new_arg]


    # Visit a parse tree produced by LanguageParser#Last_Arg.
    def visitLast_Arg(self, ctx:LanguageParser.Last_ArgContext):
        return [ctx.arg]



del LanguageParser