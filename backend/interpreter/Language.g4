grammar Language;

entry_point: exps=block END_OF_FILE                    #Entry
        ;

block: exp=expression                                   #Last_Expression
        | rest=block NEW_LINE exp=expression            #More_Expressions
        ;

expression: STRING                                      #String_Literal
        | BOOL                                          #Bool_Literal
        | INT                                           #Int_Literal
        | FLOAT                                         #Float_Literal
        | VAR                                           #Variable
        | lhs=expression '*' rhs=expression             #Multiplication
        | lhs=expression '/' rhs=expression             #Division
        | lhs=expression '+' rhs=expression             #Addition
        | lhs=expression '-' rhs=expression             #Subtraction
        | function=VAR'()'                              #Function_Call
        | <assoc=right> lhs=VAR '=' rhs=expression      #Expression_Assignment
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