grammar Language;

entry_point: exps=block END_OF_FILE                             #Entry
        ;

block: exp=expression                                           #Last_Expression
        | declaration=function_declaration                      #Function_Declaration_Block
        | flow=control_flow                                     #Control_Flow
        | rest=block NEW_LINE current=expression                    #More_Expressions
        | rest=block NEW_LINE current=function_declaration  #More_Function
        | rest=block NEW_LINE current=control_flow                 #More_Control_Flow
        ;

function_declaration: 'function' functionname=VAR NEW_LINE? ('()'|'(' NEW_LINE? ')') '{' NEW_LINE? exprs=block NEW_LINE? '}'             #Function_Declaration_Without_Args
        |'function' functionname=VAR '(' NEW_LINE? arglist=argument_list NEW_LINE? ')' NEW_LINE? '{' NEW_LINE? exprs=block NEW_LINE? '}' #Function_Declaration_With_Args 
        ;

control_flow: 'if' NEW_LINE? '(' NEW_LINE? expr=expression NEW_LINE? ')' NEW_LINE? '{' NEW_LINE? body=block NEW_LINE? '}'  #If_Statement
        | 'while' NEW_LINE? '(' NEW_LINE? expr=expression NEW_LINE? ')' NEW_LINE? '{' NEW_LINE? body=block? NEW_LINE? '}'   #While_Loop
        ;

simple_expression: STRING                                       #String_Literal
        | BOOL                                                  #Bool_Literal
        | INT                                                   #Int_Literal
        | FLOAT                                                 #Float_Literal
        | VAR                                                   #Variable
        | NULL                                                  #Null_Literal
        ;

more_array_element:
        ',' exp=expression                                          #Array_Other_Elements
        ;

expression: exp=simple_expression                               #Simple_Expression
        | varname=VAR'['index=expression']'                     #Dereferencing
        | '[]'                                                  #Empty_Array
        | '[' first=expression more_array_element* ']'    #Many_Element_Array
        | lhs=expression '==' rhs=expression                    #Is_Equal
        | lhs=expression '!=' rhs=expression                    #Is_Different
        | lhs=expression '>' rhs=expression                     #Is_Greater
        | lhs=expression '>=' rhs=expression                    #Is_Greter_Equal
        | lhs=expression '<' rhs=expression                     #Is_Less
        | lhs=expression '<=' rhs=expression                    #Is_Less_Equal
        | lhs=expression '*' rhs=expression                     #Multiplication
        | lhs=expression '/' rhs=expression                     #Division
        | lhs=expression '+' rhs=expression                     #Addition
        | lhs=expression '-' rhs=expression                     #Subtraction
        | function=VAR'(' args=argument_list ')'                #Function_Call_With_Args
        | function=VAR'()'                                      #Function_Call
        | <assoc=right> lhs=VAR '=' rhs=expression              #Expression_Assignment
        | 'return' retval=expression                            #Return
        | 'continue'                                            #Continue
        | 'break'                                               #Break
        ;

argument_list: arg=expression                            #Last_Arg
        | other_args=argument_list ',' arg=expression    #Arg_List
        ;


NEW_LINE: '\n'[ \t\r\n]*;
END_OF_FILE: [ \t\r\n]* EOF;
STRING: '"' STRING_CHAR_SEQUENCE? '"';
fragment STRING_CHAR_SEQUENCE: STRING_CHAR+;
fragment STRING_CHAR:   ~["\\\r\n]
    |   '\\\n'   // Added line
    |   '\\' ['"?abfnrtv\\]
    |   '\\\r\n' // Added line
    ;
WHITESPACE: [ \t\r]+ -> skip;
COMMENT : '//' .*? '\n' -> skip;
MULTILINE_COMMENT : '/*' .*? '*/' -> skip;
BOOL: 'true' | 'false';
NULL: 'null';
INT: [0-9]+ ;
FLOAT: [0-9]+'.'[0-9]+;
VAR: [a-zA-Z][a-zA-Z0-9_]*;