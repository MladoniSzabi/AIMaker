# Generated from Language.g4 by ANTLR 4.10.1
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .LanguageParser import LanguageParser
else:
    from LanguageParser import LanguageParser

# This class defines a complete generic visitor for a parse tree produced by LanguageParser.

class LanguageVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by LanguageParser#Entry.
    def visitEntry(self, ctx:LanguageParser.EntryContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Last_Expression.
    def visitLast_Expression(self, ctx:LanguageParser.Last_ExpressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#More_Expressions.
    def visitMore_Expressions(self, ctx:LanguageParser.More_ExpressionsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Control_Flow.
    def visitControl_Flow(self, ctx:LanguageParser.Control_FlowContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Function_Declaration_Block.
    def visitFunction_Declaration_Block(self, ctx:LanguageParser.Function_Declaration_BlockContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#More_Control_Flow.
    def visitMore_Control_Flow(self, ctx:LanguageParser.More_Control_FlowContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#More_Function.
    def visitMore_Function(self, ctx:LanguageParser.More_FunctionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Function_Declaration_Without_Args.
    def visitFunction_Declaration_Without_Args(self, ctx:LanguageParser.Function_Declaration_Without_ArgsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Function_Declaration_With_Args.
    def visitFunction_Declaration_With_Args(self, ctx:LanguageParser.Function_Declaration_With_ArgsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#If_Statement.
    def visitIf_Statement(self, ctx:LanguageParser.If_StatementContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#While_Loop.
    def visitWhile_Loop(self, ctx:LanguageParser.While_LoopContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#String_Literal.
    def visitString_Literal(self, ctx:LanguageParser.String_LiteralContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Bool_Literal.
    def visitBool_Literal(self, ctx:LanguageParser.Bool_LiteralContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Int_Literal.
    def visitInt_Literal(self, ctx:LanguageParser.Int_LiteralContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Float_Literal.
    def visitFloat_Literal(self, ctx:LanguageParser.Float_LiteralContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Variable.
    def visitVariable(self, ctx:LanguageParser.VariableContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Null_Literal.
    def visitNull_Literal(self, ctx:LanguageParser.Null_LiteralContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Array_Other_Elements.
    def visitArray_Other_Elements(self, ctx:LanguageParser.Array_Other_ElementsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Simple_Expression.
    def visitSimple_Expression(self, ctx:LanguageParser.Simple_ExpressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Multiplication.
    def visitMultiplication(self, ctx:LanguageParser.MultiplicationContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Addition.
    def visitAddition(self, ctx:LanguageParser.AdditionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Return.
    def visitReturn(self, ctx:LanguageParser.ReturnContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Less_Equal.
    def visitIs_Less_Equal(self, ctx:LanguageParser.Is_Less_EqualContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Break.
    def visitBreak(self, ctx:LanguageParser.BreakContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Dereferencing.
    def visitDereferencing(self, ctx:LanguageParser.DereferencingContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Continue.
    def visitContinue(self, ctx:LanguageParser.ContinueContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Less.
    def visitIs_Less(self, ctx:LanguageParser.Is_LessContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Subtraction.
    def visitSubtraction(self, ctx:LanguageParser.SubtractionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Function_Call.
    def visitFunction_Call(self, ctx:LanguageParser.Function_CallContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Greter_Equal.
    def visitIs_Greter_Equal(self, ctx:LanguageParser.Is_Greter_EqualContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Function_Call_With_Args.
    def visitFunction_Call_With_Args(self, ctx:LanguageParser.Function_Call_With_ArgsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Expression_Assignment.
    def visitExpression_Assignment(self, ctx:LanguageParser.Expression_AssignmentContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Different.
    def visitIs_Different(self, ctx:LanguageParser.Is_DifferentContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Division.
    def visitDivision(self, ctx:LanguageParser.DivisionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Greater.
    def visitIs_Greater(self, ctx:LanguageParser.Is_GreaterContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Many_Element_Array.
    def visitMany_Element_Array(self, ctx:LanguageParser.Many_Element_ArrayContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Empty_Array.
    def visitEmpty_Array(self, ctx:LanguageParser.Empty_ArrayContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Is_Equal.
    def visitIs_Equal(self, ctx:LanguageParser.Is_EqualContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Arg_List.
    def visitArg_List(self, ctx:LanguageParser.Arg_ListContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by LanguageParser#Last_Arg.
    def visitLast_Arg(self, ctx:LanguageParser.Last_ArgContext):
        return self.visitChildren(ctx)



del LanguageParser