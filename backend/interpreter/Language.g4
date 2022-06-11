grammar Language;

entry_point: exps=block END_OF_FILE                             #Entry
        ;

block: exp=expression                                           #Last_Expression
        | declaration=function_declaration                      #Function_Declaration_Block
        | rest=block NEW_LINE exp=expression                    #More_Expressions
        ;

function_declaration: 'function' functionname=VAR NEW_LINE? ('()'|'(' NEW_LINE? ')') '{' NEW_LINE? exprs=block NEW_LINE? '}' #Function_Declaration_Without_Args
        |'function' functionname=VAR '(' NEW_LINE? arglist=argument_list NEW_LINE? ')' NEW_LINE? '{' NEW_LINE? exprs=block NEW_LINE? '}' #Function_Declaration_With_Args 
        ;

simple_expression: STRING                                       #String_Literal
        | BOOL                                                  #Bool_Literal
        | INT                                                   #Int_Literal
        | FLOAT                                                 #Float_Literal
        | VAR                                                   #Variable
        ;

expression: exp=simple_expression                               #Simple_Expression
        | lhs=expression '*' rhs=expression                     #Multiplication
        | lhs=expression '/' rhs=expression                     #Division
        | lhs=expression '+' rhs=expression                     #Addition
        | lhs=expression '-' rhs=expression                     #Subtraction
        | function=VAR'(' args=argument_list ')'                #Function_Call_With_Args
        | function=VAR'()'                                      #Function_Call
        | <assoc=right> lhs=VAR '=' rhs=expression              #Expression_Assignment
        ;

argument_list: arg=simple_expression                            #Last_Arg
        | other_args=argument_list ',' arg=simple_expression    #Arg_List
        ;


NEW_LINE: '\n'[ \t\r\n]*;
END_OF_FILE: [ \t\r\n]* EOF;
WHITESPACE: [ \t\r]+ -> skip;
COMMENT : '//' .*? '\n' -> skip;
MULTILINE_COMMENT : '/*' .*? '*/' -> skip;
BOOL: 'true' | 'false';
INT: [0-9]+ ;
FLOAT: [0-9]+'.'[0-9]+;
VAR: [a-zA-Z][a-zA-Z0-9_]*;
STRING: '"' [a-zA-Z0-9_]+ '"';